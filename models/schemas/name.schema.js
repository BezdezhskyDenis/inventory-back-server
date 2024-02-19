const mongoose = require("mongoose");

const nameSchema = new mongoose.Schema({
  first: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 256,
    trim: true,
  },
  last: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 256,
    trim: true,
  },
});

module.exports = nameSchema;
