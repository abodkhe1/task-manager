const User = require('../models/User');
const express = require('express');
const bcrypt = require('bcryptjs');
const UserRouter = express.Router();

// GET Signup Form
UserRouter.get('/signup', (req, res) => {
  res.render('signup'); // render signup page
});

// POST Signup
UserRouter.post('/signup', async (req, res) => {
  try {
    const { username, password } = req.body;

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create and save user
    const user = new User({ username, password: hashedPassword });
    await user.save();

    // Redirect to login with success message
    res.redirect('/login-success');
  } catch (error) {
    console.error('Error during signup:', error);
    res.status(500).send('Internal Server Error');
  }
});

// GET Login Form with success message after signup
UserRouter.get('/login-success', (req, res) => {
  res.render('login', { error: '', signup: true }); // Render login page with signup success message
});

// GET Login Form
UserRouter.get('/login', (req, res) => {
    // Pass the 'signup' variable to the view, defaulting to null or false if not present
    res.render('login', { signup: req.query.signup || false });
});

// POST Login
UserRouter.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;

    // Find user by username
    const user = await User.findOne({ username });

    // Check if user exists and compare password
    if (user && await bcrypt.compare(password, user.password)) {
      req.session.userId = user._id; // Store user ID in session
      return res.redirect('/first-enter'); // Redirect to first entry page after successful login
    } else {
      // Invalid login credentials
      console.error('Invalid login credentials.');
      return res.render('login', { error: 'Username or password does not match.', signup: '' });
    }
  } catch (error) {
    console.error('Error during login process:', error);
    res.status(500).send('Internal Server Error');
  }
});

// POST Logout
UserRouter.post('/logout', (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.error('Error during logout:', err);
      return res.status(500).send('Internal Server Error');
    }
    res.redirect('/login'); // Redirect to login page after logout
  });
});

module.exports = UserRouter;
