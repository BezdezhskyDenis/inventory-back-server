const Joi = require("joi");

// Validation schema for the 'name' property
const humanNameJoiSchema = Joi.object({
  first: Joi.string().min(2).max(256).required(),
  last: Joi.string().min(2).max(256).required(),
}).required();

// Validation schema for the 'phone' property
const phoneJoiSchema = Joi.string()
  .pattern(/0[0-9]{1,2}\-?\s?[0-9]{3}\s?[0-9]{4}/)
  .message("User phone must be a valid phone number")
  .required();

// Validation schema for the 'email' property
const emailJoiSchema = Joi.string()
  .min(5)
  .max(256)
  .required()
  .email({ tlds: { allow: false } });

const nameJoiSchema = Joi.string().min(2).max(256).required()

module.exports = {
  emailJoiSchema,
  humanNameJoiSchema,
  phoneJoiSchema,
  nameJoiSchema,
};
