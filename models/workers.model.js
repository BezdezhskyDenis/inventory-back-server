const mongoose = require("mongoose");
const Joi = require("joi");

const { Department } = require("./departments.model");
const { Location } = require("./locations.model");
const nameSchema = require("./schemas/name.schema");

const workerSchema = new mongoose.Schema(
  {
    name: nameSchema,
    phone: {
      type: String,
      required: true,
      match: RegExp(/0[0-9]{1,2}\-?\s?[0-9]{3}\s?[0-9]{4}/),
    },
    email: {
      type: String,
      required: true,
      minlength: 5,
      maxlength: 256,
      unique: true,
      lowercase: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    isManager: {
      type: Boolean,
      default: false,
    },
    department: {
      type: mongoose.Types.ObjectId,
      ref: "Department",
    },
    workerNumber: {
      type: Number,
      required: true,
      unique: true,
    },
    idNumber: {
      type: Number,
      unique: true,
      minlength: 8,
      maxlength: 10,
    },
    workLocation: {
      type: mongoose.Types.ObjectId,
      ref: "Location",
    },
    equipments: {
      type: Array,
    },
    computerName: {
      type: String,
      maxlength: 64,
    },
    vpn: {
      type: Boolean,
      default: false,
    },
    company_id: {
      type: mongoose.Types.ObjectId,
      ref: "Company",
    },
  },
  {
    methods: {
      toggleEquipments(equipment_id) {
        if (this.equipments.includes(equipment_id)) {
          this.equipments = this.equipments.filter((uid) => uid !== equipment_id);
        } else {
          this.equipments.push(equipment_id);
        }
        return this.save();
      },
    },
  }
);

const Worker = mongoose.model("Worker", workerSchema, "workers");

function validateWorker(worker, requestMethod) {
  const schema = Joi.object({
    name: Joi.object({
      first: Joi.string().min(2).max(256).required(),
      last: Joi.string().min(2).max(256).required(),
    }).required(),
    phone: Joi.string()
      .pattern(/0[0-9]{1,2}\-?\s?[0-9]{3}\s?[0-9]{4}/)
      .message("user phone mast be a valid phone number")
      .required(),
    email: Joi.string()
      .min(5)
      .max(256)
      .required()
      .email({ tlds: { allow: false } }),
    isManager: Joi.boolean(),
    workerNumber: Joi.number().required(),
    department: Joi.string()
      .optional()
      .custom((value, helper) => {
        return Department.findById(value)
          .then((department) => {
            if (!department) {
              return helper.message(`Unknown department "${value}"`);
            }
          })
          .catch(() =>
            helper.message(`Error validating department "${value}"`)
          );
      }),
    workLocation: Joi.string()
      .optional()
      .custom((value, helper) => {
        return Location.findById(value)
          .then((workLocation) => {
            if (!workLocation) {
              return helper.message(`Unknown department "${value}"`);
            }
          })
          .catch(() =>
            helper.message(`Error validating department "${value}"`)
          );
      }),
    idNumber: Joi.number().min(99_999_999).max(999_999_999),
    vpn: Jou.boolean(),
    computerName: Joi.string().max(64),
  });
  return schema.validate(worker);
}

function checkValidId(id) {
  return mongoose.isValidObjectId(id);
}

module.exports = {
  Worker,
  validateWorker,
  checkValidId,
};
