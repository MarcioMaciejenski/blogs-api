const categoriesService = require('../services/categories.service');

const insertCategory = async (req, res) => {
  try {
    const { name } = req.body;
    const addCategory = await categoriesService.insertCategory(name);
    return res.status(201).json(addCategory.dataValues);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: err.message });
  }
};

module.exports = {
  insertCategory,
};