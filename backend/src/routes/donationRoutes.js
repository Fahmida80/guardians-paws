const express = require('express');
const router = express.Router();
const Donation = require('../models/Donation');

// Get all donations
router.get('/', async (req, res) => {
  try {
    const donations = await Donation.find().sort('-createdAt');
    res.json({ success: true, data: donations });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Add donation
router.post('/', async (req, res) => {
  try {
    const donation = await Donation.create(req.body);
    res.status(201).json({ success: true, data: donation });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
});

module.exports = router;