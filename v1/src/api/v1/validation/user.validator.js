const JoiBase = require('joi')
const JoiDate = require('@joi/date')
const JoiPostalCode = require('joi-postalcode')
const { joiPasswordExtendCore } = require('joi-password')

let Joi = JoiBase.extend(JoiDate)
Joi = Joi.extend(JoiPostalCode)
Joi = Joi.extend(joiPasswordExtendCore)

//   .extend()
//   .extend(require('joi-postalcode'))

exports.UserRegister = {
  body: Joi.object({
    first_name: Joi.string().required(),
    last_name: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string()
      .min(5)
      .minOfSpecialCharacters(1)
      .minOfLowercase(2)
      .minOfUppercase(1)
      .minOfNumeric(1)
      .doesNotInclude(['password'])
      .max(15)
      .required(),
    confirm_password: Joi.any().valid(Joi.ref('password')).required(),
    address_1: Joi.string().required(),
    address_2: Joi.string().allow(null, ''),
    country_id: Joi.string().required().guid(),
    state_id: Joi.string().required().guid(),
    city: Joi.string().required(),
    country_code: Joi.string().required(),
    zip_code: Joi.alternatives().conditional('country_code', {
      is: 'US',
      then: Joi.string().postalCode('US').required(),
      otherwise: Joi.string().postalCode('CA').required(),
    }),
    phone_no: Joi.string().required(),
    arba_no: Joi.string().allow(null, ''),
    accept_terms_and_condition: Joi.date().iso().required(),
  }),
}

//
exports.isEmailExist = {
  body: Joi.object({
    email: Joi.string().email().required(),
    role: Joi.string().required(),
  }),
}

exports.verifyEmail = {
  body: Joi.object({
    user_code: Joi.string().required(),
  }),
  query: null,
}

exports.login = {
  body: Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string()
      .min(5)
      .minOfSpecialCharacters(1)
      .minOfLowercase(2)
      .minOfUppercase(1)
      .minOfNumeric(1)
      .doesNotInclude(['password'])
      .max(15)
      .required(),
  }),
  query: null,
}

exports.refreshToken = {
  body: Joi.object({
    refreshToken: Joi.string().required(),
  }),
  query: null,
}
