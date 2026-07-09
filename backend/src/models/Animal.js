const mongoose = require('mongoose');

const animalSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    enum: ['dog', 'cat', 'other'],
    required: true,
  },
  story: {
    type: String,
    required: true,
  },
  imageUrl: {
    type: String,
    required: true,
  },
  mediaType: {              // ← ADD THIS
    type: String,
    enum: ['image', 'video'],
    default: 'image',
  },
  status: {
    type: String,
    enum: ['in_care', 'adopted', 'medical_need'],
    default: 'in_care',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Animal', animalSchema);