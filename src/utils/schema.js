const Joi = require('joi');

const userSchema = Joi.object({
  displayName: Joi.string().min(8).required().messages({
    'string.empty': '"displayName" length must be at least 8 characters long',
    'string.min': '"displayName" length must be at least 8 characters long',
  }),
  email: Joi.string().email().required().messages({
    'string.empty': '"email" must be a valid email',
    'string.email': '"email" must be a valid email',
  }),
  password: Joi.string().min(6).required().messages({
    'string.empty': '"password" length must be at least 6 characters long',
    'string.min': '"password" length must be at least 6 characters long',
  }),
  image: Joi.string(),
});

const categoriesSchema = Joi.object({
  name: Joi.string().required().messages({
    'string.empty': '"name" is required',
  }),
});

const postSchema = Joi.object({
  title: Joi.string().required().messages({ 'string.empty': 'Some required fields are missing' }),
  content: Joi.string().required().messages({ 'string.empty': 'Some required fields are missing' }),
  categoryIds: Joi.array().min(1).messages({
    'array.min': 'Some required fields are missing' }),
});

module.exports = {
  userSchema,
  categoriesSchema,
  postSchema,
};
