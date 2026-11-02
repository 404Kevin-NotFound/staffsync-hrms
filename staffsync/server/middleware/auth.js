const jwt = require('jsonwebtoken');
const User = require('../models/User');
async function protect(req, res, next) {
  try {
    const header = req.headers.authorization || '';
    const token = header.startsWith('Bearer ') ? header.slice(7) : null;
    if (!token) return res.status(401).json({ message: 'Authentication required' });
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.id).select('-password');
    if (!req.user) return res.status(401).json({ message: 'Account not found' });
    next();
  } catch (err) { return res.status(401).json({ message: 'Invalid or expired token' }); }
}
function allowRoles(...roles) { return (req, res, next) => roles.includes(req.user.role) ? next() : res.status(403).json({ message: 'You do not have permission for this action' }); }
module.exports = { protect, allowRoles };
