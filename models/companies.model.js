const mongoose = require("mongoose");
const Joi = require("joi");

const { nameJoiSchema } = require("./validationSchemas/joiValidationSchemas");

const companySchema = new mongoose.Schema({
  name: {
    type: String,
    minLength: 2,
    maxLength: 256,
    trim: true,
    lowercase: true,
    required: true,
    unique: true,
  },
  owner_id: {
    type: mongoose.Types.ObjectId,
    ref: "User",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Company = mongoose.model("Company", companySchema, "companies");

function validateCompany(company) {
  const schema = Joi.object({
    name: nameJoiSchema
  });
  return schema.validate(company);
}

module.exports = { Company, validateCompany };
