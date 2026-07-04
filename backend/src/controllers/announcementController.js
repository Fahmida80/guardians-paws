const Announcement = require('../models/Announcement');

// Get all announcements (PUBLIC)
const getAnnouncements = async (req, res) => {
  try {
    const announcements = await Announcement.find().sort('-createdAt');
    res.json({ success: true, data: announcements });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Server error' });
  }
};

// Get single announcement (PUBLIC)
const getAnnouncement = async (req, res) => {
  try {
    const announcement = await Announcement.findById(req.params.id);
    if (!announcement) {
      return res.status(404).json({ success: false, error: 'Not found' });
    }
    res.json({ success: true, data: announcement });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Server error' });
  }
};

// Create announcement (ADMIN ONLY)
const createAnnouncement = async (req, res) => {
  try {
    const { text, isActive } = req.body;
    const announcement = await Announcement.create({
      text,
      isActive: isActive !== undefined ? isActive : true,
      createdBy: req.user.email,
    });
    res.status(201).json({ success: true, data: announcement });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Server error' });
  }
};

// Update announcement (ADMIN ONLY)
const updateAnnouncement = async (req, res) => {
  try {
    const { text, isActive } = req.body;
    const announcement = await Announcement.findById(req.params.id);
    
    if (!announcement) {
      return res.status(404).json({ success: false, error: 'Not found' });
    }
    
    if (text) announcement.text = text;
    if (isActive !== undefined) announcement.isActive = isActive;
    
    await announcement.save();
    res.json({ success: true, data: announcement });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Server error' });
  }
};

// Delete announcement (ADMIN ONLY)
const deleteAnnouncement = async (req, res) => {
  try {
    const announcement = await Announcement.findById(req.params.id);
    
    if (!announcement) {
      return res.status(404).json({ success: false, error: 'Not found' });
    }
    
    await announcement.deleteOne();
    res.json({ success: true, message: 'Announcement deleted' });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Server error' });
  }
};

module.exports = {
  getAnnouncements,
  getAnnouncement,
  createAnnouncement,
  updateAnnouncement,
  deleteAnnouncement,
};