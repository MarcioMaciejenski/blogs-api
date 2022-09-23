const { User } = require('../models');

const checkDataLogin = async (email) => {
  const existEmail = await User.findOne({
    where: { email },
  });
  console.log(existEmail);
  return existEmail;
};

module.exports = {
  checkDataLogin,
};
