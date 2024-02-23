const mongoose = require("mongoose");
const Joi = require("joi");

const { Category } = require("./categories.model");

const { nameJoiSchema } = require("./validationSchemas/joiValidationSchemas");

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    minLength: 2,
    maxLength: 256,
    trim: true,
    lowercase: true,
    required: true,
  },
  category: {
    type: mongoose.Types.ObjectId,
    ref: "Category",
    require: true,
  },
  Manufacturing: {
    type: String,
    minLength: 2,
    maxLength: 256,
    trim: true,
    lowercase: true,
    required: true,
  },
  type: {
    type: String,
    minLength: 2,
    maxLength: 256,
    trim: true,
    lowercase: true,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  quantity: {
    type: Number,
    default: 0,
    maxlength: 99999,
  },
  available: {
    type: Boolean,
    default: false,
  },
  equipment: {
    type: Boolean,
    default: false,
  },
  company_id: {
    type: mongoose.Types.ObjectId,
    ref: "Company",
  },
});

const Product = mongoose.model("Product", productSchema, "products");

function validateProduct(product, requestMethod) {
  const schema = Joi.object({
    name: nameJoiSchema,
    Manufacturing: nameJoiSchema,
    type: nameJoiSchema,
    category: Joi.string()
      .optional()
      .custom((value, helper) => {
        return Category.findById(value)
          .then((category) => {
            if (!category) {
              return helper.message(`Unknown category "${value}"`);
            }
          })
          .catch(() => helper.message(`Error validating category "${value}"`));
      }),
    quantity: Joi.number().min(0).max(99_999),
    available: Joi.boolean(),
    equipment: Joi.boolean(),
  });
  return schema.validate(product);
}

function checkValidId(id) {
  return mongoose.isValidObjectId(id);
}

module.exports = {
  Product,
  validateProduct,
  checkValidId,
};
