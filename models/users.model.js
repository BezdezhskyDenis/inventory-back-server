const mongoose = require("mongoose");
const Joi = require("joi");
const jwt = require("jsonwebtoken");

const personNameSchema = require("./schemas/personName.schema");
const {
  emailJoiSchema,
  humanNameJoiSchema,
  phoneJoiSchema,
} = require("./validationSchemas/joiValidationSchemas");

const userSchema = new mongoose.Schema(
  {
    name: personNameSchema,
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
    password: {
      type: String,
      required: true,
      minlength: 8,
      maxlength: 1024,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    isManager: {
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
      generateAuthToken() {
        return jwt.sign(
          {
            _id: this._id,
            isAdmin: this.isAdmin,
            isManager: this.isManager,
            company_id: this.company_id,
          },
          process.env.JWT_SIGNATURE
        );
      },
    },
  }
);

const User = mongoose.model("User", userSchema, "users");

function validateUser(user, requestMethod) {
  const schema = Joi.object({
    name: humanNameJoiSchema,
    phone: phoneJoiSchema,
    email: emailJoiSchema,
    password: Joi.string()
      .min(8)
      .max(20)
      .pattern(/^(?=.*[A-Z])(?=.*[!@#$%^&*]).*$/)
      .message(
        "Password must be at least 8 characters long, contain at least one uppercase letter, and include one of the following special characters: !@#$%^&*"
      )
      .when(requestMethod, {
        is: "POST",
        then: Joi.required(),
      }),
    isManager: Joi.boolean(),
    isAdmin: Joi.boolean(),
  });
  return schema.validate(user);
}

function checkValidId(id) {
  return mongoose.isValidObjectId(id);
}

module.exports = {
  User,
  validateUser,
  checkValidId,
};
