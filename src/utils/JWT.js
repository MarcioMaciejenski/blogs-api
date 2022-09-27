const jwt = require('jsonwebtoken');

const jwtConfig = {
  expiresIn: '1d',
  algorithm: 'HS256',
};

const { JWT_SECRET } = process.env;

const generateToken = (payload) => jwt.sign(payload, JWT_SECRET, jwtConfig);

const validateToken = (token) => {
  try {
    const verifyToken = jwt.verify(token, JWT_SECRET);
    return verifyToken;
  } catch (e) {
    const err = new Error(e.message);
    throw err;
  }
};

const findIdByToken = (token) => {
  const idDecoded = jwt.verify(token, JWT_SECRET);
  return idDecoded.id;
};

module.exports = {
  generateToken,
  validateToken,
  findIdByToken,
};
