const validateToken = require('../utils/JWT');

const tokenAuth = async (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) {
    return res.status(401).json({ message: 'Token not found' });
  }

  try {
    validateToken.validateToken(token);
  } catch (error) {
    return res.status(401).json({ message: 'Expired or invalid token' });    
  }
  return next();
};

module.exports = tokenAuth;