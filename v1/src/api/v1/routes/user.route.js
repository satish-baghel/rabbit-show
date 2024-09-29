const express = require('express')
const router = express.Router()
const userController = require('../controller/user.controller')
const Validator = require('../middleware/validator')
const { user } = require('../validation/index')

router
  .route('/register')
  .post(Validator(user.UserRegister), userController.userRegister)

///
router
  .route('/email-check')
  .post(Validator(user.isEmailExist), userController.checkEmail)

router
  .route('/verify-email')
  .post(Validator(user.verifyEmail), userController.verifyEmail)

router.route('/login').post(Validator(user.login), userController.loginUser)
router
  .route('/refresh-token')
  .post(Validator(user.refreshToken), userController.refreshToken)

module.exports = router
