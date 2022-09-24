const userService = require('../services/user.service');

const insertUser = async (req, res) => {
  try {
    const userData = req.body;
    const existsEmail = await userService.verifyEmail(userData.email);

    if (existsEmail === null) {
      const insertResult = await userService.insertUser(userData);  
      return res.status(201).json(insertResult);
    }

    if (existsEmail.email === userData.email) {
      return res.status(409).json({ message: 'User already registered' });
    }
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: err.message });
  }
};

module.exports = {
  insertUser,
};
