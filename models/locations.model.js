const mongoose = require("mongoose");
const Joi = require("joi");
const { Department } = require("./departments.model")

const locationSchema = new mongoose.Schema({
  floor: {
    type: String,
    maxLength: 2,
    trim: true,
    required: true,
  },
  department: {
    type: mongoose.Types.ObjectId,
    ref: "Department",
    required: true,
  },
  roomNumber: {
    type: Number,
    maxLength: 10
  },
  company_id: {
    type: mongoose.Types.ObjectId,
    ref: "Company",
  }
});

const Location = mongoose.model("Location", locationSchema, "locations");

function validateLocation(location) {
  const schema = Joi.object({
    floor: Joi.string().min(1).max(5).required(),
    roomNumber: Joi.number().max(999).allow(null),
    department: Joi.string().required()
      .custom((value, helper) => {
        return Department.findById(value)
          .then((department) => {
            if (!department) {
              return helper.message(`Unknown department "${value}"`);
            }
          })
          .catch(() => helper.message(`Error validating department "${value}"`));
      }),
  });
  
  return schema.validate(location);
}

module.exports = {Location, validateLocation};
