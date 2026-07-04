const express = require('express');
const router = express.Router();
const multer = require('multer');
const { protect, adminOnly } = require('../middleware/auth');
const { uploadImage } = require('../controllers/uploadController');

// Configure multer (memory storage)
const storage = multer.memoryStorage();
const upload = multer({ storage });

// Upload image (ADMIN ONLY)
router.post('/', protect, adminOnly, upload.single('image'), uploadImage);

module.exports = router;