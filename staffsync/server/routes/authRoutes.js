const router = require('express').Router();
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { protect } = require('../middleware/auth');
const tokenFor = id => jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '7d' });
router.post('/register', async (req, res, next) => {
  try {
    const { name, email, password, department } = req.body;
    if (!name || !email || !password) return res.status(400).json({ message: 'Name, email and password are required' });
    if (password.length < 6) return res.status(400).json({ message: 'Password must be at least 6 characters' });
    if (await User.findOne({ email: email.toLowerCase() })) return res.status(409).json({ message: 'Email already registered' });
    const user = await User.create({ name, email, password, department, role: 'Employee' });
    res.status(201).json({ token: tokenFor(user._id), user: { id: user._id, name: user.name, email: user.email, role: user.role, department: user.department } });
  } catch (e) { next(e); }
});
router.post('/login', async (req, res, next) => {
  try {
    const user = await User.findOne({ email: String(req.body.email || '').toLowerCase() });
    if (!user || !(await user.matchPassword(req.body.password || ''))) return res.status(401).json({ message: 'Invalid email or password' });
    res.json({ token: tokenFor(user._id), user: { id: user._id, name: user.name, email: user.email, role: user.role, department: user.department } });
  } catch (e) { next(e); }
});
router.get('/me', protect, (req, res) => res.json({ user: req.user }));
module.exports = router;
