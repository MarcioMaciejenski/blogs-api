const loginService = require('../services/login.service');

const checkDataLogin = async (req, res) => {
  try {
    const { email } = req.body;
    const result = await loginService.checkDataLogin(email);

    if (result === null) {
      return res.status(400).json({ message: 'Invalid fields' });
    }
    return res.status(200).json({ result });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  checkDataLogin,
};
