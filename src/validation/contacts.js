// src/validation/contacts.js

import Joi from 'joi';
import { isValidObjectId } from 'mongoose';

export const createContactSchema = Joi.object({
  _id: Joi.string(),
  name: Joi.string().min(3).max(20).required(),
  phoneNumber: Joi.number().integer().required(),
  email: Joi.string().min(3).max(20).allow(null, ''),
  isFavourite: Joi.boolean(),
  contactType: Joi.string()
    .min(3)
    .max(20)
    .valid('work', 'home', 'personal')
    .required(),
  userId: Joi.string().custom((value, helper) => {
    if (value && !isValidObjectId(value)) {
      return helper.message('User id should be a valid mongo id');
    }
    return true;
  }),
});

export const updateContactSchema = Joi.object({
  _id: Joi.string(),
  name: Joi.string().min(3),
  phoneNumber: Joi.number().integer(),
  email: Joi.string().min(3).allow(null, ''),
  isFavourite: Joi.boolean(),
  contactType: Joi.string().min(3).valid('work', 'home', 'personal'),
});
