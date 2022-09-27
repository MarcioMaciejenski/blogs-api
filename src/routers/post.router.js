const express = require('express');
const tokenAuth = require('../middlewares/tokenAuth');
const PostController = require('../controllers/post.controller');
const validatePostData = require('../middlewares/validatePostData');

const router = express.Router();

router.post('/', tokenAuth, validatePostData, PostController.insertPost);
router.get('/', tokenAuth, PostController.getAllPosts);

module.exports = router;
