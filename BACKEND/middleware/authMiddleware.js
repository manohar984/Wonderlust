const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET || 'wanderlust_secret_key_123';

module.exports = (req, res, next) => {
  const authHeader = req.headers['authorization'];

  if (!authHeader) {
    return res.status(401).json({ error: 'Access denied. No authorization token provided.' });
  }

  const token = authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'Access denied. Token format is invalid (should be Bearer <token>).' });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = doded; // Attach user payload to request object
    next();
  } catch (err) {
    console.error('JWT Verification Error:', err.message);
    res.status(401).json({ error: 'Access denied. Token is expired or invalid.' });
  }
};
