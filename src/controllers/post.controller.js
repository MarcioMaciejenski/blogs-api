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

const getAllPosts = async (_req, res) => {
  const posts = await postService.getAllPosts();

  return res.status(200).json(posts);
};

const getPostById = async (req, res) => {
  try {
    const { id } = req.params;
    const postById = await postService.getPostById(id);

    if (postById === null) {
      return res.status(404).json({ message: 'Post does not exist' });
    }
    return res.status(200).json(postById);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: err.message });
  }
};

const updatePostById = async (req, res) => {
  try {
    const userId = findIdByToken(req.header('Authorization'));
    const isUserIdPost = await postService.verifyUserIdPost(userId);

    if (isUserIdPost === null) {
      return res.status(401).json({ message: 'Unauthorized user' });
    }

    const { id } = req.params;
    const updatePost = await postService.updatePostById(id, req.body);
    
    if (updatePost) {
      const post = await postService.getPostById(id);
      return res.status(200).json(post);
    }
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: err.message });
  }
};

module.exports = {
  insertPost,
  getAllPosts,
  getPostById,
  updatePostById,
};
