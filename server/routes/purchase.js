const express = require('express')
const router = express.Router();

const controller = require('../controllers/purchase');

router.put('/', controller.purchaseController) 

module.exports = router;