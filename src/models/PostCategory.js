const PostCategorySchema = (sequelize, DataTypes) => {
  const PostCategoryTable = sequelize.define('PostCategory', {
    categoryId: DataTypes.INTEGER,
    postId: DataTypes.INTEGER,
  },
  {
    tableName: 'posts_categories',
    underscored: true,
    timestamps: false,
  });

  PostCategoryTable.associate = (models) => {
    models.Category.belongsToMany(models.BlogPost, {
      as: 'blog_posts',
      through: PostCategoryTable,
      foreignKey: 'id',
      otherKey: 'categoryId',
    });
    models.BlogPost.belongsToMany(models.Category, {
      as: 'categories',
      through: PostCategoryTable,
      foreignKey: 'id',
      otherKey: 'postId',
    });
  };

  return PostCategoryTable;
};

module.exports = PostCategorySchema;
