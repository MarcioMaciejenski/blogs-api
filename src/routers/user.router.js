const express = require('express');
const UserController = require('../controllers/user.controller');
const userMiddleware = require('../middlewares/validateUser');
const tokenAuth = require('../middlewares/tokenAuth');

const router = express.Router();

router.post('/', userMiddleware, UserController.insertUser);
router.get('/', tokenAuth, UserController.getAllUsers);
router.get('/:id', tokenAuth, UserController.getUserById);
router.delete('/me', tokenAuth, UserController.deleteUserByToken);

module.exports = router;