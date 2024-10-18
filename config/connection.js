const express = require('express');
const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://ajitbodkhe2017:FlyPKnR5DkwRsdqA@taskmanager.xsgn3.mongodb.net/taskManager?retryWrites=true&w=majority', {
    serverSelectionTimeoutMS: 5000, // Adjust server selection timeout
    connectTimeoutMS: 10000,        // Adjust connection timeout
    socketTimeoutMS: 45000          // Adjust socket timeout
})
  .then(() => {
    console.log("Connected to MongoDB successfully");
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
  });
module.exports = mongoose 
