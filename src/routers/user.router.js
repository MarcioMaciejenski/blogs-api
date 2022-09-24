const express = require('express');
const UserController = require('../controllers/user.controller');
const userMiddleware = require('../middlewares/validateUser');

const router = express.Router();

router.post('/', userMiddleware, UserController.insertUser);

module.exports = router;