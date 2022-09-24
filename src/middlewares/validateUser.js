const { userSchema } = require('../utils/schema');

const validateUser = (req, res, next) => {
  const validation = userSchema.validate(req.body);
  if (validation.error) {
    return res.status(400).json({ message: validation.error.details[0].message });
  }
  return next();
};

module.exports = validateUser;
