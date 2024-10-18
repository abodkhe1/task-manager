const express = require('express');
const mongoose = require('mongoose');

// mongoDB Connection
mongoose.connect('mongodb://localhost:27017/taskManager')
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
  });

module.exports = mongoose;
