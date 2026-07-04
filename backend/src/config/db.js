const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI);
    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`❌ MongoDB Error:`);
    console.error(`   Message: ${error.message}`);
    console.log(`   Make sure your MONGODB_URI in .env is correct`);
  }
};

module.exports = connectDB;