const Joi = require("joi");

const UserSchema = {
  register: Joi.object({
    name: Joi.string().alphanum().min(3).max(30).required(),
    email: Joi.string()
      .email({
        minDomainSegments: 2,
        tlds: { allow: ["com", "net", "me", "org"] },
      })
      .required(),
    phone: Joi.string()
      .pattern(/^[0-9]{10}$/)
      .required(),
    password: Joi.string()
      .pattern(new RegExp('^[a-zA-Z0-9!@#$%^&*()_+={}|:"<>?\\,-.]{4,30}$'))
      .required(),
  }),
  login: Joi.object({
    email: Joi.string()
      .email({
        minDomainSegments: 2,
        tlds: { allow: ["com", "net", "me", "org"] },
      })
      .required(),
    // phone: Joi.string().pattern(/^[0-9]{10}$/),
    password: Joi.string()
      .pattern(new RegExp('^[a-zA-Z0-9!@#$%^&*()_+={}|:"<>?\\,-.]{4,30}$'))
      .required(),
  }),
  userId: Joi.object({
    userId: Joi.string()
      .regex(/^[0-9a-fA-F]{24}$/)
      .required(),
  }),
  params: {
    userId: Joi.object({
      id: Joi.string()
        .regex(/^[0-9a-fA-F]{24}$/)
        .required(),
    }),
  },
};

const NoteSchema = {
  addNewNote: Joi.object({
    title: Joi.string().required(),
    text: Joi.string().required(),
  }),
  editNote: Joi.object({
    noteId: Joi.string()
      .regex(/^[0-9a-fA-F]{24}$/)
      .required(),
    title: Joi.string().required(),
    text: Joi.string().required(),
  }),
  params: {
    noteId: Joi.object({
      noteId: Joi.string()
        .regex(/^[0-9a-fA-F]{24}$/)
        .required(),
    }),
  },
};

module.exports = {
  UserSchema,
  NoteSchema,
};
