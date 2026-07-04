const express = require('express');
const router = express.Router();
const { protect, adminOnly } = require('../middleware/auth');
const { getTransactions, getTransactionSummary } = require('../controllers/transactionController');

// Public route
router.get('/summary', getTransactionSummary);

// Admin only route
router.get('/', protect, adminOnly, getTransactions);

module.exports = router;