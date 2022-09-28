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

const deletePostById = async (req, res) => {
  try {
    const userId = await findIdByToken(req.header('Authorization'));

    const { id } = req.params;
    const existPost = await postService.verifyPostExists(id);
    
    if (existPost === null) {
      return res.status(404).json({ message: 'Post does not exist' });
    }
    const postDeleted = await postService.deletePostById(id, userId);
    if (postDeleted === 0) {
      return res.status(401).json({ message: 'Unauthorized user' });
    }
    return res.status(204).send();
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: err.message });
  }
};

const findPostByTerm = async (req, res) => {
  try {
    const term = req.query.q;
    const searchPostByTerm = await postService.findPostByTerm(term);

    return res.status(200).json(searchPostByTerm);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: err.messae });
  }
};

module.exports = {
  insertPost,
  getAllPosts,
  getPostById,
  updatePostById,
  deletePostById,
  findPostByTerm,
};
