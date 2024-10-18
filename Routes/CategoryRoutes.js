const Category = require('../models/Category');
const express = require('express');
const CategoryRouter = express.Router();
const { isAuthenticated } = require('../middleware/middleware');

// GET Categories Route
CategoryRouter.get('/categories', isAuthenticated, async (req, res) => {
  try {
    const categories = await Category.find({ user: req.session.userId });
    res.render('categories', { categories });
  } catch (error) {
    console.error("Error fetching categories:", error);
    res.status(500).send('Internal Server Error');
  }
});

// POST Create Category
CategoryRouter.post('/categories', isAuthenticated, async (req, res) => {
  try {
    const { name } = req.body;
    const category = new Category({ name, user: req.session.userId });
    await category.save();
    res.redirect('/categories');
  } catch (error) {
    console.error("Error creating category:", error);
    res.status(500).send('Internal Server Error');
  }
});

// DELETE Category
CategoryRouter.delete('/categories/:id', isAuthenticated, async (req, res) => {
  try {
    await Category.findByIdAndDelete(req.params.id);
    res.redirect('/categories');
  } catch (error) {
    console.error("Error deleting category:", error);
    res.status(500).send('Internal Server Error');
  }
});

module.exports = CategoryRouter;
