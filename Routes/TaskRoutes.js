const Task = require('../models/Task');
const Category = require('../models/Category');
const express = require('express');
const TaskRouter = express.Router();
const { isAuthenticated } = require('../middleware/middleware');

// GET Tasks
TaskRouter.get('/tasks', isAuthenticated, async (req, res) => {
  try {
    const tasks = await Task.find({ user: req.session.userId }).populate('category');
    res.render('tasks', { tasks, username: req.session.username, success: '' });
  } catch (error) {
    console.error("Error fetching tasks:", error);
    res.status(500).send('Internal Server Error');
  }
});

// GET First Enter (After Login)
TaskRouter.get('/first-enter', isAuthenticated, async (req, res) => {
  try {
    const tasks = await Task.find({ user: req.session.userId }).populate('category');
    res.render('tasks', { tasks, username: req.session.username, success: 'Logged in Successfully' });
  } catch (error) {
    console.error("Error fetching tasks on first enter:", error);
    res.status(500).send('Internal Server Error');
  }
});

// GET Task Creation Form
TaskRouter.get('/tasks/create', isAuthenticated, async (req, res) => {
  try {
    const categories = await Category.find({ user: req.session.userId });
    res.render('create-task', { task: {}, categories });
  } catch (error) {
    console.error("Error fetching categories for task creation:", error);
    res.status(500).send('Internal Server Error');
  }
});

// GET Task Edit Form
TaskRouter.get('/task-edit/:id', isAuthenticated, async (req, res) => {
  try {
    const task = await Task.findById(req.params.id).populate('category');
    if (!task) {
      return res.redirect('/tasks');
    }
    const categories = await Category.find({ user: req.session.userId });
    res.render('create-task', { task, categories });
  } catch (error) {
    console.error("Error fetching task for editing:", error);
    res.status(500).send('Internal Server Error');
  }
});

// POST Create Task
TaskRouter.post('/tasks', isAuthenticated, async (req, res) => {
  try {
    const { title, description, status, dueDate, category } = req.body;
    const task = new Task({
      title,
      description,
      status,
      dueDate,
      category,
      user: req.session.userId
    });
    await task.save();
    res.redirect('/tasks');
  } catch (error) {
    console.error("Error creating task:", error);
    res.status(500).send('Internal Server Error');
  }
});

// PUT Update Task
TaskRouter.put('/tasks/:id', isAuthenticated, async (req, res) => {
  try {
    const { title, description, status, dueDate, category } = req.body;
    await Task.findByIdAndUpdate(req.params.id, {
      title,
      description,
      status,
      dueDate,
      category,
    });
    res.redirect('/tasks');
  } catch (error) {
    console.error("Error updating task:", error);
    res.status(500).send('Internal Server Error');
  }
});

// DELETE Task
TaskRouter.delete('/tasks/:id', isAuthenticated, async (req, res) => {
  try {
    await Task.findByIdAndDelete(req.params.id);
    res.redirect('/tasks');
  } catch (error) {
    console.error("Error deleting task:", error);
    res.status(500).send('Internal Server Error');
  }
});

module.exports = TaskRouter;
