const { Op } = require('sequelize');
const { BlogPost, Category, PostCategory, User } = require('../models');

const verifyCategoryExists = async (categories) => {
  const existsCategory = [];
  await Promise.all(categories.map(async (cat) => {
    const result = await Category.findByPk(cat);
   
    if (result === null) return existsCategory.push(null);
    return existsCategory.push(cat);
  }));
  return existsCategory;
};

const insertPost = async (postData) => {
  const { title, content, userId, categoryIds } = postData;
  const createPost = await BlogPost.create({
    title, content, userId, published: Date.now(), updated: Date.now() });

  await Promise.all(categoryIds.map((category) => PostCategory
   .create({ postId: createPost.dataValues.id, categoryId: category })));
  return createPost;
};

const getAllPosts = async () => {
  const allPosts = await BlogPost.findAll({
    include: [
      {
        model: User,
        as: 'user',
        attributes: { exclude: ['password'] },
      },
      {
        model: Category,
        as: 'categories',
        through: { attributes: [] },
      },
    ],
  });
  return allPosts;
};

const getPostById = async (id) => {
  const getPost = await BlogPost.findOne({
    where: { id },
    include: [
      {
        model: User,
        as: 'user',
        attributes: { exclude: ['password'] },
      },
      {
        model: Category,
        as: 'categories',
        through: { attributes: [] },
      },
    ],
  });
  return getPost;
};

const updatePostById = async (id, { title, content }) => {
  const updatePost = await BlogPost.update(
    { title, content, updated: Date.now() },
    { where: { id } },
  );
  return updatePost;
};

const verifyUserIdPost = async (id) => {
  const userId = await BlogPost.findOne({
    where: { userId: id },
    attributes: { exclude: ['id', 'title', 'content', 'published', 'updated'] },
  });
  return userId;
};

const verifyPostExists = async (id) => {
  const postId = await BlogPost.findOne({
    where: { id },
    attributes: { exclude: ['title', 'content', 'idUser', 'published', 'updated'] },
  });
  return postId;
};

const deletePostById = async (id, userId) => {
  const postDeleted = await BlogPost.destroy({ where: { id, userId } });
  return postDeleted;
};

const findPostByTerm = async (term) => {
  const searchPostByTerm = await BlogPost.findAll({
    where: { // https://www.tabnine.com/code/javascript/functions/sequelize site aonde pesquisei sobre [Op.or] e [Op.like]
      [Op.or]: [{ title: { [Op.like]: `%${term}%` } },
        { content: { [Op.like]: `%${term}%` } }] },
    include: [
      {
        model: User,
        as: 'user',
        attributes: { exclude: ['password'] },
      },
      {
        model: Category,
        as: 'categories',
        through: { attributes: [] },
      },
    ],
  });
  return searchPostByTerm;
};

module.exports = {
  insertPost,
  verifyCategoryExists,
  getAllPosts,
  getPostById,
  updatePostById,
  verifyUserIdPost,
  verifyPostExists,
  deletePostById,
  findPostByTerm,
};