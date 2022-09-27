const { postSchema } = require('../utils/schema');

const validatePostData = (req, res, next) => {
  const validation = postSchema.validate(req.body);
  if (validation.error) {
    return res.status(400).json({ message: validation.error.details[0].message });
  }
  return next();
};

module.exports = validatePostData;
