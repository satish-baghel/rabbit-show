const { Router } = require('express')
const router = Router()
const countryRoute = require('./routes/country.route')
const stateRoute = require('./routes/state.route')
const userRoute = require('./routes/user.route')

router.use('/country', countryRoute)
router.use('/state', stateRoute)
router.use('/user', userRoute)

module.exports = router
