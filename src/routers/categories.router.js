const express = require('express');
const CategoriesController = require('../controllers/categories.controller');
const categoriesMiddleware = require('../middlewares/validateCategories');
const tokenAuth = require('../middlewares/tokenAuth');

const router = express.Router();

router.post('/', tokenAuth, categoriesMiddleware, CategoriesController.insertCategory);
router.get('/', tokenAuth, CategoriesController.getAllCategories);

module.exports = router;