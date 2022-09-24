const CategorySchema = (sequelize, DataTypes) => {
  const CategoryTable = sequelize.define('Category', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    name: DataTypes.STRING,
  },
  {
    tableName: 'categories',
    timestamps: false,
  });
  return CategoryTable;
};

module.exports = CategorySchema;