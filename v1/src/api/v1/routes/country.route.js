const express = require('express')
const router = express.Router()
const countryController = require('../controller/country.controller')

router.route('/').get(countryController.allCountry)
module.exports = router
