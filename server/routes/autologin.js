const express = require('express')
const router = express.Router();

const controller = require('../controllers/autologin');

router.get('/', controller.autoLoginController) 

module.exports = router;