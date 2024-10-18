const express = require('express');
const mongoose = require('mongoose');

// mongoDB Connection
// mongoose.connect('mongodb://localhost:27017/taskManager')
mongoose.connect('mongodb+srv://ajitbodkhe2017:FlyPKnR5DkwRsdqA@taskmanager.xsgn3.mongodb.net/?retryWrites=true&w=majority&appName=taskManager')
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
  });

module.exports = mongoose;
