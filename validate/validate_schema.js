const Joi = require('@hapi/joi');

const userSchema = Joi.object({
	username: Joi.string().alphanum().required(),
	password: Joi.string().pattern(/^[a-zA-Z0-9]+$/).required(),
	email: Joi.string().email().lowercase().required(),
	phoneNumber: Joi.string().required(),
	birthdate: Joi.string().required(),
	themeName: Joi.string(),
	skills: Joi.array().items(Joi.string()),
	projects: Joi.array().items(Joi.string()),
})

const themeSchema = Joi.object({
	themeName: Joi.string().required(),
	fontSize: Joi.number(),
	fontColor: Joi.string().alphanum(),
	backgroundColor: Joi.string()
})

module.exports = { userSchema, themeSchema}