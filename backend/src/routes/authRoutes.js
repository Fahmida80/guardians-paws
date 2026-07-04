const express = require('express');
const router = express.Router();
const { loginUser, verifyToken, logoutUser } = require('../controllers/authController');
const { protect } = require('../middleware/auth');

router.post('/login', loginUser);
router.post('/verify', protect, verifyToken);
router.post('/logout', logoutUser);

module.exports = router;