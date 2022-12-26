const Joi = require("joi");

const createUserSchema = Joi.object({
  firstName: Joi.string().required(),
  lastName: Joi.string().required(),
  email: Joi.string().email().required(),
  phone: Joi.string()
    .required()
    .max(10)
    .pattern(/^[0-9]+$/),
});

const updateUserSchema = Joi.object({
  firstName: Joi.string().optional(),
  lastName: Joi.string().optional(),
  email: Joi.string().email().optional(),
  phone: Joi.string()
    .optional()
    .max(10)
    .pattern(/^[0-9]+$/),
});

module.exports = {
  createUserSchema,
  updateUserSchema,
};
