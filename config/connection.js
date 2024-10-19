const express = require('express');
const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://ajitbodkhe2017:FlyPKnR5DkwRsdqA@taskmanager.xsgn3.mongodb.net/taskManager', {
  serverSelectionTimeoutMS: 10000, // Increase server selection timeout
  connectTimeoutMS: 15000,         // Increase connection timeout
  socketTimeoutMS: 60000           // Increase socket timeout
})
  .then(() => {
    console.log("Connected to MongoDB successfully");
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
  });
module.exports = mongoose 
