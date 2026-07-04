const mongoose = require('mongoose');

const announcementSchema = new mongoose.Schema({
    text: {
      type: String,
      required: true,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    createdBy: {
      type: String,
      default: '',
    },
    createdAt: {
      type: Date,
      default: Date.now,  // Make sure this line exists
    },
  });

module.exports = mongoose.model('Announcement', announcementSchema);