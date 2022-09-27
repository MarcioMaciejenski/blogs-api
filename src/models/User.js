const UserSchema = (sequelize, DataTypes) => {
  const UserTable = sequelize.define('User', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    displayName: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    image: DataTypes.STRING,
  },
  {
    tableName: 'users',
    underscored: true,
    timestamps: false,
  });

  UserTable.associate = (models) => {
    UserTable.hasMany(models.BlogPost, {
      constraint: true,
      as: 'blog_posts',
      foreignKey: 'userId',
    });
  }

  return UserTable;
};

module.exports = UserSchema;