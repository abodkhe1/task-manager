const express = require('express');
const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://ajitbodkhe2017:JY77QtyZSzx5uVMm@taskmanager.xsgn3.mongodb.net/taskManager', {
  serverSelectionTimeoutMS: 10000, 
  connectTimeoutMS: 15000,        
  socketTimeoutMS: 60000           
})
  .then(() => {
    console.log("Connected to MongoDB successfully");
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
  });
module.exports = mongoose 
