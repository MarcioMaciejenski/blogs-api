const postService = require('../services/post.service');
const { findIdByToken } = require('../utils/JWT');

const insertPost = async (req, res) => {
  try {
    const categories = req.body.categoryIds;
    const existsCategory = await postService.verifyCategoryExists(categories);

    if (existsCategory.every((e) => e === null)) {
      return res.status(400).json({ message: '"categoryIds" not found' });
    }

    const validCategories = existsCategory.filter((cat) => cat !== null);
    
    const userId = findIdByToken(req.header('Authorization'));
    const postData = { ...req.body, userId, categoryIds: validCategories };
    const createPost = await postService.insertPost(postData);
    
    return res.status(201).json(createPost);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: err.message });
  }
};

module.exports = {
  insertPost,
};
