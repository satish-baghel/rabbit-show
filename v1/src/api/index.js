const { Router } = require('express')
const router = Router()
const v1Routes = require('./v1/index')
router.use('/v1', v1Routes)

module.exports = router
