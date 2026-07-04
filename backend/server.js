// // const express = require('express');
// // const cors = require('cors');
// // const dotenv = require('dotenv');
// // const connectDB = require('./src/config/db');

// // dotenv.config();

// // // Connect to database
// // connectDB();

// // const app = express();

// // // Middleware
// // app.use(cors());
// // app.use(express.json());

// // // Routes
// // app.use('/api/animals', require('./src/routes/animalRoutes'));
// // app.use('/api/donations', require('./src/routes/donationRoutes'));
// // app.use('/api/auth', require('./src/routes/authRoutes'));
// // app.use('/api/upload', require('./src/routes/uploadRoutes'));
// // app.use('/api/announcement', require('./src/routes/announcementRoutes'));

// // // Test route
// // app.get('/', (req, res) => {
// //   res.json({ message: '🐾 Guardians of Paws API is running!' });
// // });

// // const cloudinary = require('cloudinary').v2;

// // cloudinary.config({
// //   cloudinary_url: process.env.CLOUDINARY_URL
// // });

// // cloudinary.api.ping((error, result) => {
// //   if (error) {
// //     console.error('❌ Cloudinary Error:', error.message);
// //   } else {
// //     console.log('✅ Cloudinary Connected:', result.status);
// //   }
// // });
// // // END OF TEST

// // const PORT = process.env.PORT || 5000;
// // app.listen(PORT, () => {
// //   console.log(`🐾 Server running on http://localhost:${PORT}`);
// // });


// const express = require('express');
// const cors = require('cors');
// const dotenv = require('dotenv');
// const mongoose = require('mongoose');

// dotenv.config();

// const app = express();

// // Middleware
// app.use(cors());
// app.use(express.json());

// // ===== DATABASE CONNECTIONS =====
// let trackingConnection = null;

// // Main DB
// mongoose.connect(process.env.MONGODB_URI)
//   .then(() => console.log('✅ Main DB Connected'))
//   .catch(err => console.error('❌ Main DB Error:', err.message));

// // Tracking DB (if available)
// if (process.env.TRACKING_DB_URI) {
//   trackingConnection = mongoose.createConnection(process.env.TRACKING_DB_URI);
//   trackingConnection.on('connected', () => console.log('✅ Tracking DB Connected'));
//   trackingConnection.on('error', (err) => console.error('❌ Tracking DB Error:', err.message));
// } else {
//   console.log('⚠️ Tracking DB URI not found. Skipping...');
// }

// // Make tracking connection available to routes
// app.set('trackingConnection', trackingConnection);

// // ===== ROUTES =====
// app.use('/api/animals', require('./src/routes/animalRoutes'));
// app.use('/api/donations', require('./src/routes/donationRoutes'));
// app.use('/api/auth', require('./src/routes/authRoutes'));
// app.use('/api/upload', require('./src/routes/uploadRoutes'));
// app.use('/api/announcement', require('./src/routes/announcementRoutes'));
// app.use('/api/transactions', require('./src/routes/transactionRoutes'));

// // Test route
// app.get('/', (req, res) => {
//   res.json({ message: '🐾 Guardians of Paws API is running!' });
// });

// // ===== CLOUDINARY =====
// const cloudinary = require('cloudinary').v2;

// cloudinary.config({
//   cloudinary_url: process.env.CLOUDINARY_URL
// });

// cloudinary.api.ping((error, result) => {
//   if (error) {
//     console.error('❌ Cloudinary Error:', error.message);
//   } else {
//     console.log('✅ Cloudinary Connected:', result.status);
//   }
// });

// // ===== START SERVER =====
// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => {
//   console.log(`🐾 Server running on http://localhost:${PORT}`);
// });

const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const http = require('http');
const { Server } = require('socket.io');

dotenv.config();

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

// Middleware
app.use(cors());
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

  // Send initial summary when client connects
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

  // Listen for new transaction events (from tracking app)
  socket.on('new-transaction', () => {
    sendSummary();
  });

  // Listen for transaction updates
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