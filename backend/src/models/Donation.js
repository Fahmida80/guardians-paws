const mongoose = require('mongoose');

const donationSchema = new mongoose.Schema({
  donorName: String,
  donorPhone: String,
  amount: Number,
  transactionId: String,
  status: {
    type: String,
    enum: ['pending', 'confirmed'],
    default: 'pending',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Donation', donationSchema);