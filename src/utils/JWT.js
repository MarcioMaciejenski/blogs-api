const jwt = require('jsonwebtoken');

const jwtConfig = {
  expiresIn: '1h',
  algorithm: 'HS256',
};

const { TOKEN_SECRET } = process.env;

const generateToken = (payload) => {
  jwt.sign(payload, TOKEN_SECRET, jwtConfig);
};

module.exports = {
  generateToken,
};
