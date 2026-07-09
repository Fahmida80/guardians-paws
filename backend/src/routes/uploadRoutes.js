const express = require('express');
const router = express.Router();
const multer = require('multer');
const { protect, adminOnly } = require('../middleware/auth');
const { uploadMedia } = require('../controllers/uploadController');

// Configure multer with 50MB limit
const storage = multer.memoryStorage();
const upload = multer({ 
  storage,
  limits: { fileSize: 50 * 1024 * 1024 } // 50MB limit
});

// Upload route
router.post('/', protect, adminOnly, upload.single('image'), uploadMedia);

module.exports = router;