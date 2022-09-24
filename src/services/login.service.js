const { User } = require('../models');
const { generateToken } = require('../utils/JWT');

const checkDataLogin = async (email) => {
  const user = await User.findOne({
    where: { email },
  });
  if (user === null) return user;
  
  const token = generateToken({
    id: user.dataValues.id,
    email: user.dataValues.email,
  });
  return token;
};

module.exports = {
  checkDataLogin,
};
