const express = require('express');
const router = express.Router();

const GoogleOAuthHandler = require('../controllers/session-controller');

router.get('/', GoogleOAuthHandler)

module.exports = router;