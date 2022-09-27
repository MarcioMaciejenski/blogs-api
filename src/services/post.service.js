const { BlogPost, Category, PostCategory } = require('../models');

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
    console.log('servicepost', createPost.dataValues.id);
    console.log('categoryIds', categoryIds);
  await Promise.all(categoryIds.map((category) => PostCategory
   .create({ postId: createPost.dataValues.id, categoryId: category })));
  // const insertCategory = await PostCategory.create({
  //   postId: createPost.dataValues.id, categoryId: categoryIds[0] });
  // console.log(insertCategory);
  return createPost;
};

module.exports = {
  insertPost,
  verifyCategoryExists,
};