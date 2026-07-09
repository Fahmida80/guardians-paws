const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const http = require('http');
const { Server } = require('socket.io');

dotenv.config();

const app = express();
const server = http.createServer(app);

const allowedOrigins = [
  'http://localhost:3000',
  'http://localhost:5000',
  'https://www.gpcbd.org',
  'https://gpcbd.org',
  'https://guardians-paws-lilac.vercel.app'
];

// ===== CORS CONFIGURATION =====
app.use(cors({
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);
    if (allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
}));

// Manual CORS headers (backup for preflight)
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', req.headers.origin || '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization, x-auth-token');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Credentials', 'true');
  if (req.method === 'OPTIONS') {
    return res.sendStatus(200);
  }
  next();
});

// ===== SOCKET.IO =====
const io = new Server(server, {
  cors: {
    origin: allowedOrigins,
    methods: ["GET", "POST"],
    credentials: true,
  },
});

// Middleware
app.use(express.json());

// ===== DATABASE CONNECTIONS =====
let trackingConnection = null;

mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('✅ Main DB Connected'))
  .catch(err => console.error('❌ Main DB Error:', err.message));

if (process.env.TRACKING_DB_URI) {
  trackingConnection = mongoose.createConnection(process.env.TRACKING_DB_URI);
  trackingConnection.on('connected', () => console.log('✅ Tracking DB Connected'));
  trackingConnection.on('error', (err) => console.error('❌ Tracking DB Error:', err.message));
} else {
  console.log('⚠️ Tracking DB URI not found. Skipping...');
}

app.set('trackingConnection', trackingConnection);
app.set('io', io);

// ===== ROUTES =====
app.use('/api/animals', require('./src/routes/animalRoutes'));
app.use('/api/donations', require('./src/routes/donationRoutes'));
app.use('/api/auth', require('./src/routes/authRoutes'));
app.use('/api/upload', require('./src/routes/uploadRoutes'));
app.use('/api/announcement', require('./src/routes/announcementRoutes'));
app.use('/api/transactions', require('./src/routes/transactionRoutes'));

// Test route
app.get('/', (req, res) => {
  res.json({ message: '🐾 Guardians of Paws API is running!' });
});

// ===== SOCKET.IO CONNECTION =====
io.on('connection', (socket) => {
  console.log('🟢 New client connected:', socket.id);

  const sendSummary = async () => {
    try {
      const conn = app.get('trackingConnection');
      if (!conn) return;
      
      const Transaction = conn.model('Transaction', require('./src/models/Transaction').schema);
      
      const [totalDonations, totalExpenses, count, recent] = await Promise.all([
        Transaction.aggregate([{ $group: { _id: null, total: { $sum: '$incomingDonation' } } }]),
        Transaction.aggregate([{ $group: { _id: null, total: { $sum: '$dailyTotalExpense' } } }]),
        Transaction.countDocuments(),
        Transaction.find().sort('-date').limit(10).select('date incomingDonation dailyTotalExpense'),
      ]);
      
      socket.emit('summary-update', {
        totalDonations: totalDonations[0]?.total || 0,
        totalExpenses: totalExpenses[0]?.total || 0,
        transactionCount: count,
        recent: recent.map(t => ({
          date: t.date,
          incomingDonation: t.incomingDonation,
          dailyTotalExpense: t.dailyTotalExpense,
        })),
      });
    } catch (error) {
      console.error('Error sending summary:', error);
    }
  };

  sendSummary();

  socket.on('new-transaction', () => {
    sendSummary();
  });

  socket.on('transaction-updated', () => {
    sendSummary();
  });

  socket.on('disconnect', () => {
    console.log('🔴 Client disconnected:', socket.id);
  });
});

// ===== CLOUDINARY =====
const cloudinary = require('cloudinary').v2;
cloudinary.config({ cloudinary_url: process.env.CLOUDINARY_URL });
cloudinary.api.ping((error, result) => {
  if (error) console.error('❌ Cloudinary Error:', error.message);
  else console.log('✅ Cloudinary Connected:', result.status);
});

// ===== START SERVER =====
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`🐾 Server running on http://localhost:${PORT}`);
});