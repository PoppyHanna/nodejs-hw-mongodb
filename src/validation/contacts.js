import Joi from "joi";

export const createContactSchema = Joi.object({
    name: Joi.string().min(3).max(20).required().messages({
        'string.empty': 'Name is required',
        'string.min': 'Name must be at least 3 characters long',
        'any.required': 'Missing required field: name'
    }),
    phoneNumber: Joi.string().pattern(/^(\+?38)?[\s-]?\(?0\d{2}\)?[\s-]?\d{3}[\s-]?\d{2}[\s-]?\d{2}$/).required().messages({
        'string.pattern.base': 'Invalid number format',
        'string.empty': 'The phone number field is required'
    }),
    email: Joi.string().email({ maxDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).required().messages({
        'string.email': 'Email must be a valid eamail',
        'any.required': 'Missing required field: email'
    }),
    isFavourite: Joi.boolean(),
    contactType: Joi.string().valid('work', 'home', 'personal').required(),
});

export const updateContactSchema = Joi.object({
    name: Joi.string().min(3).max(20).messages({
        'string.min': 'Name must be at least 3 characters long'
    }),
    phoneNumber: Joi.string().messages({
        'string.min': 'Phone number must be at least 10 characters long'
    }),
    email: Joi.string().email().messages({
        'string.email': 'Email must be a valid eamail'
    }),
    isFavourite: Joi.boolean(),
    contactType: Joi.string().valid('work', 'home', 'personal'),
}).min(1).messages({
    'object.min': 'At least one field must be provided for update'
});