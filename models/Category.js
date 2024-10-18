// Category Schema
const mongoose = require('../config/connection');

const categorySchema = new mongoose.Schema({
  name: {
     type: String,
      required: true 
    },
  user: {
     type: mongoose.Schema.Types.ObjectId, 
     ref: 'User', 
     required: true 
    }
});

module.exports = mongoose.model('Category', categorySchema);
