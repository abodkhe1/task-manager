const express = require('express');
const mongoose = require('mongoose');

// MongoDB Connection
mongoose.connect('mongodb+srv://ajitbodkhe2017:FlyPKnR5DkwRsdqA@taskmanager.xsgn3.mongodb.net/taskManager?retryWrites=true&w=majority', {
    useNewUrlParser: true,       // Use new URL string parser
    useUnifiedTopology: true,    // Use new topology engine
    serverSelectionTimeoutMS: 5000, // Adjust server selection timeout (default is 30,000ms)
    connectTimeoutMS: 10000,     // Adjust connection timeout
    socketTimeoutMS: 45000       // Adjust socket timeout (close idle connections after 45 seconds)
})
  .then(() => {
    console.log("Connected to MongoDB successfully");
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
  });

module.exports = mongoose;
