const Category = require("../models/Category");

// Get all categories
exports.getCategories = async (req, res) => {
  try {
    const categories = await Category.find().select("-__v");
    res.json(categories);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server error");
  }
};

// Add new category
exports.addCategory = async (req, res) => {
  try {
    const newCategory = new Category(req.body);
    const category = await newCategory.save();
    res.json(category);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server error");
  }
};
