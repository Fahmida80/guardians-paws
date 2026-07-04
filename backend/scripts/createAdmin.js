const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
require('dotenv').config();

const userSchema = new mongoose.Schema({
  email: String,
  password: String,
  name: String,
  role: String,
  isActive: Boolean,
  lastLogin: Date,
  createdAt: { type: Date, default: Date.now },
});

const User = mongoose.model('User', userSchema);

const createAdmin = async () => {
  try {
    console.log('Connecting to MongoDB...');
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected!');
    
    const existingAdmin = await User.findOne({ email: 'admin@guardianspaws.com' });
    if (existingAdmin) {
      console.log('⚠️ Admin already exists!');
      console.log('📧 Email: admin@guardianspaws.com');
      await mongoose.disconnect();
      process.exit();
    }
    
    // CHANGE PASSWORD HERE - This is the strong password
    const hashedPassword = await bcrypt.hash('GPC@2025#Admin$Secure', 10);
    
    const admin = new User({
      email: 'admin@guardianspaws.com',
      password: hashedPassword,
      name: 'Super Admin',
      role: 'superadmin',
      isActive: true,
    });
    
    await admin.save();
    
    console.log('✅ Admin created successfully!');
    console.log('📧 Email: admin@guardianspaws.com');
    console.log('🔑 Password: GPC@2025#Admin$Secure');
    
    await mongoose.disconnect();
    process.exit();
  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
};

createAdmin();