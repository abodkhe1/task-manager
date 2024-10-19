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


    const hashedPassword = await bcrypt.hash(password, 10);


    const user = new User({ username, password: hashedPassword });
    await user.save();

    
    req.session.signupSuccess = true;
    res.redirect('/login');
  } catch (error) {
    console.error('Error during signup:', error);
    res.status(500).send('Internal Server Error');
  }
});

// GET Login Form

UserRouter.get('/login', (req, res) => {
  res.render('login', { error: '' }); 
});


// POST Login
UserRouter.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await User.findOne({ username });

  
    if (user && await bcrypt.compare(password, user.password)) {
      req.session.userId = user._id; 
      return res.redirect('/first-enter'); 
    } else {
     
      return res.render('login', { error: 'Username or password does not match.' });
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
    res.redirect('/login'); 
  });
});

module.exports = UserRouter;
