const express = require('express')
const router = express.Router();

const controller = require('../controllers/google');

router.post('/', controller.googleController) 

module.exports = router;