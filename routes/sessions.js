const express = require('express')
const router = express.Router()
const {CreateUserSessionHandler, GetSessionHandler} = require('../controllers/session-controller');

router.route('/').post(CreateUserSessionHandler);
router.route('/').get(GetSessionHandler);