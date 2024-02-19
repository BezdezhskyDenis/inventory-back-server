const mongoose = require("mongoose");
const Joi = require("joi");

const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    minLength: 2,
    maxLength: 256,
    trim: true,
    lowercase: true,
    required: true,
  },
  company_id: {
    type: mongoose.Types.ObjectId,
    ref: "Company",
  }
});

const Category = mongoose.model("Category", categorySchema, "categories");

function validateCategory(category) {
  const schema = Joi.object({
    name: Joi.string().min(2).max(256).required(),
  });
  return schema.validate(category);
}

module.exports = {Category, validateCategory};
