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

const getAllUsers = async (_req, res) => {
  const users = await userService.getAllUsers();

  return res.status(200).json(users);
};

const getUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await userService.getUserById(id);

    if (user === null) {
      return res.status(404).json({ message: 'User does not exist' });
    }    
    return res.status(200).json(user);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: err.message });
  }
};

module.exports = {
  insertUser,
  getAllUsers,
  getUserById,
};
