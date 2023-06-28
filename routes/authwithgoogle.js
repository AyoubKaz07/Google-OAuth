const express = require('express')
const router = express.Router()

const AuthGoogleUrl = require('../controllers/authgoogleurl')

router.route('/').get(AuthGoogleUrl)

module.exports = router