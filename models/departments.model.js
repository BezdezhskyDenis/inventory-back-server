const mongoose = require("mongoose");
const Joi = require("joi");

const { nameJoiSchema } = require("./validationSchemas/joiValidationSchemas");

const departmentSchema = new mongoose.Schema({
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
  },
});

const Department = mongoose.model("Department", departmentSchema, "departments");

function validateDepartment(department) {
  const schema = Joi.object({
    name: nameJoiSchema
  });
  return schema.validate(department);
}

module.exports = {Department, validateDepartment};
