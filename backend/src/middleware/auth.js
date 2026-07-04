const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Protect routes - JWT authentication
const protect = async (req, res, next) => {
  let token;
  
  // Check for token in headers
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
  }
  
  if (!token && req.headers['x-auth-token']) {
    token = req.headers['x-auth-token'];
  }
  
  if (!token) {
    return res.status(401).json({
      success: false,
      error: 'Not authorized. No token provided.',
    });
  }
  
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.id).select('-password');
    
    if (!req.user) {
      return res.status(401).json({
        success: false,
        error: 'User not found',
      });
    }
    
    if (!req.user.isActive) {
      return res.status(401).json({
        success: false,
        error: 'Account disabled. Contact admin.',
      });
    }
    
    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      error: 'Not authorized. Invalid token.',
    });
  }
};

// Admin only middleware
const adminOnly = (req, res, next) => {
  if (req.user && (req.user.role === 'admin' || req.user.role === 'superadmin')) {
    next();
  } else {
    res.status(403).json({
      success: false,
      error: 'Access denied. Admin only.',
    });
  }
};

module.exports = { protect, adminOnly };