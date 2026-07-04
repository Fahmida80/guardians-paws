const TransactionModel = require('../models/Transaction');

// Get tracking database connection
const getTrackingConnection = (req) => {
  const conn = req.app.get('trackingConnection');
  if (!conn) {
    throw new Error('Tracking database not available');
  }
  return conn;
};

// Get all transactions (Admin only)
const getTransactions = async (req, res) => {
  try {
    const conn = getTrackingConnection(req);
    const Transaction = conn.model('Transaction', TransactionModel.schema);
    const transactions = await Transaction.find().sort('-date');
    res.json({ success: true, data: transactions });
  } catch (error) {
    console.error('Error fetching transactions:', error);
    res.status(500).json({ success: false, error: error.message || 'Server error' });
  }
};

// Get transaction summary (Public)
const getTransactionSummary = async (req, res) => {
  try {
    const conn = getTrackingConnection(req);
    const Transaction = conn.model('Transaction', TransactionModel.schema);

    const [totalDonations, totalExpenses, count, recent] = await Promise.all([
      Transaction.aggregate([{ $group: { _id: null, total: { $sum: '$incomingDonation' } } }]),
      Transaction.aggregate([{ $group: { _id: null, total: { $sum: '$dailyTotalExpense' } } }]),
      Transaction.countDocuments(),
      Transaction.find().sort('-date').limit(10).select('date incomingDonation dailyTotalExpense'),
    ]);

    res.json({
      success: true,
      data: {
        totalDonations: totalDonations[0]?.total || 0,
        totalExpenses: totalExpenses[0]?.total || 0,
        transactionCount: count,
        recent: recent.map((t) => ({
          date: t.date,
          incomingDonation: t.incomingDonation,
          dailyTotalExpense: t.dailyTotalExpense,
        })),
      },
    });
  } catch (error) {
    console.error('Error fetching summary:', error);
    res.status(500).json({ success: false, error: error.message || 'Server error' });
  }
};

module.exports = { getTransactions, getTransactionSummary };