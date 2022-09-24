const { User } = require('../models');
const { generateToken } = require('../utils/JWT');

const verifyEmail = async (email) => {
  const searchEmail = await User.findOne({
    where: { email },
    attributes: { exclude: ['id', 'displayName', 'password', 'image'] },
  });
  return searchEmail;
};

const insertUser = async (userData) => {
  const { displayName, email, password, image } = userData;
  const newUser = await User.create({ displayName, email, password, image });
  const token = generateToken({
    id: newUser.dataValues.id,
    email: newUser.dataValues.email,
  });
  return { token };
};

const getAllUsers = async () => User.findAll({
  attributes: { exclude: ['password'] },
});

module.exports = {
  insertUser,
  verifyEmail,
  getAllUsers,
};