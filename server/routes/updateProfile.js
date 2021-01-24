const express = require('express')
const router = express.Router();

const controller = require('../controllers/updateProfile');

router.post('/', controller.updateProfileController) 

module.exports = router;