const { Schema, model } = require("mongoose");
const Joi = require("joi");

// const contactSchema = Schema({
//   name: {
//     type: String,
//     required: true
//   }
//   email: {
//     type: String,
//     required: true,
//   } ,
//   phone: {
//     type: String,
//     required: true
//   },
//   favorite: {
//     type: Boolean,
//     default: false
//   }
// });

// const joiAddContactSchema = Joi.object({
//   name: Joi.string().min(2).max(30).required(),
//   email: Joi.string().email().min(5).max(30).required(),
//   phone: Joi.string().min(5).max(20).required(),
//   favorite: Joi.boolean()
// });

// const Contact = model("contact", contactSchema);

// module.exports = {
//   Contact,
//   schemas: {
//     add: joiAddContactSchema
//   }
// };

// ===2===

const phoneRegexp =
  /^\+?.\(?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/;

const contactSchema = Schema(
  {
    name: {
      type: String,
      minlength: 2,
      maxlength: 30,
      required: [true, "Set name for contact"],
    },
    email: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      mutch: phoneRegexp,
      required: true,
    },
    favorite: {
      type: Boolean,
      default: false,
    },
  },
  { versionKey: false, timestamps: true }
);

const joiSchema = Joi.object({
  name: Joi.string().min(2).max(30).required(),
  email: Joi.string().required(),
  phone: Joi.string().pattern(phoneRegexp).required(),
  favorite: Joi.bool(),
});

const joiStatusSchema = Joi.object({
  favorite: Joi.bool().required(),
});

const Contact = model("contact", contactSchema);

module.exports = {
  Contact,
  joiSchema,
  joiStatusSchema,
};
