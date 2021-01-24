const express = require('express')
const router = express.Router();

const controller = require('../controllers/signin');

router.post('/', controller.loginController); 

module.exports = router;