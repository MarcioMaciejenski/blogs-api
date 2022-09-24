const { categoriesSchema } = require('../utils/schema');

const validateCategories = (req, res, next) => {
  const validation = categoriesSchema.validate(req.body);
  if (validation.error) {
    return res.status(400).json({ message: validation.error.details[0].message });
  }
  return next();
};

module.exports = validateCategories;
