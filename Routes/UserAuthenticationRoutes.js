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

    // Redirect to login page with a success message
    req.session.signupSuccess = true;
    res.redirect('/login');
  } catch (error) {
    console.error('Error during signup:', error);
    res.status(500).send('Internal Server Error');
  }
});

// GET Login Form
UserRouter.get('/login', (req, res) => {
  // Check for signup success message
  const signupSuccess = req.session.signupSuccess || false;
  // Clear the signup success message after displaying
  req.session.signupSuccess = false;
  res.render('login', { error: '', signupSuccess });
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
      return res.render('login', { error: 'Username or password does not match.', signupSuccess: false });
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
