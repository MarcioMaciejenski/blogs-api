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
        as: 'users',
        attributes: { exclude: ['password'] },
      },
      {
        model: Category,
        as: 'categories',
        through: { attributes: [] },
      },
    ],
  });
  console.log('AllPosts', allPosts);
  return allPosts;
};

module.exports = {
  insertPost,
  verifyCategoryExists,
  getAllPosts,
};