const { response, defaultErrorResponse } = require("../helpers/api.helper");
const { createUserSchema, updateUserSchema } = require("../utils/validations");
const { ValidationError } = require("joi");
const {
  validationError,
  createUserSuccess,
  emailExistsError,
  phoneExistsError,
  userNotFound,
  userDeleteSuccess,
} = require("../utils/messages");
const { User } = require("../models");

module.exports = {
  register: async (req, res) => {
    try {
      await createUserSchema.validateAsync(req.body);
      const emailExists = await User.findOne({
        email: req.body.email,
      });
      if (emailExists) {
        return res.json(response(false, emailExistsError()));
      }

      const phoneExists = await User.findOne({
        phone: req.body.phone,
      });
      if (phoneExists) {
        return res.json(response(false, phoneExistsError()));
      }

      const user = await new User(req.body).save();

      return res.json(response(true, createUserSuccess(), user));
    } catch (e) {
      let message = "";
      let status = 500;
      if (e instanceof ValidationError) {
        message = validationError();
        status = 400;
      }
      return res
        .status(status)
        .json(defaultErrorResponse(false, message, [e.message]));
    }
  },
  userById: async (req, res) => {
    try {
      const user = await User.findById(req.params.id);
      if (!user) {
        return res.status(404).json(response(false, userNotFound()));
      }

      return res.json(response(true, "", user));
    } catch (e) {
      let message = "";
      let status = 500;
      if (e instanceof ValidationError) {
        message = validationError();
        status = 400;
      }
      console.log({ e });
      return res
        .status(status)
        .json(defaultErrorResponse(false, message, [e.message]));
    }
  },
  update: async (req, res) => {
    try {
      await updateUserSchema.validateAsync(req.body);
      const user = await User.findById(req.params.id);
      if (!user) {
        return res.status(404).json(response(false, userNotFound()));
      }

      if (req.body.firstName) {
        user.firstName = req.body.firstName;
      }
      if (req.body.lastName) {
        user.lastName = req.body.lastName;
      }
      if (req.body.email) {
        const checkEmailExists = await User.find({
          email: req.body.email,
        });
        const checkEmail = checkEmailExists.find(
          (val) => val.id != req.params.id
        );
        if (checkEmail) {
          return res.json(response(false, emailExistsError()));
        }
        user.email = req.body.email;
      }
      if (req.body.phone) {
        const checkPhoneExists = await User.find({
          phone: req.body.phone,
        });
        const checkPhone = checkPhoneExists.find(
          (val) => val.id != req.params.id
        );
        if (checkPhone) {
          return res.json(response(false, phoneExistsError()));
        }
        user.phone = req.body.phone;
      }

      await user.save();

      return res.json(response(true, "", user));
    } catch (e) {
      let message = "";
      let status = 500;
      if (e instanceof ValidationError) {
        message = validationError();
        status = 400;
      }
      return res
        .status(status)
        .json(defaultErrorResponse(false, message, [e.message]));
    }
  },
  delete: async (req, res) => {
    try {
      const user = await User.findById(req.params.id);
      if (!user) {
        return res.status(404).json(response(false, userNotFound()));
      }

      user.delete();

      return res.json(response(true, userDeleteSuccess()));
    } catch (e) {
      let message = "";
      let status = 500;
      if (e instanceof ValidationError) {
        message = validationError();
        status = 400;
      }

      return res
        .status(status)
        .json(defaultErrorResponse(false, message, [e.message]));
    }
  },
  list: (req, res) => {
    const filters = {};
    if (req.body.email) {
      filters.email = req.body.email;
    }
    if (req.body.firstName) {
      filters.firstName = req.body.firstName;
    }
    if (req.body.lastName) {
      filters.lastName = req.body.lastName;
    }
    if (req.body.phone) {
      filters.phone = req.body.phone;
    }
    User.find(filters)
      .then((data) => {
        res.json(response(true, "", data));
      })
      .catch((e) => {
        return res
          .status(500)
          .json(defaultErrorResponse(false, message, [e.message]));
      });
  },
};
