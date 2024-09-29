const express = require('express')
const router = express.Router()
const stateController = require('../controller/state.controller')

router.route('/').get(stateController.allState)
module.exports = router
