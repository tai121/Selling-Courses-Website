const express = require('express')
const router = express.Router()
const completeController = require('../controllers/complete.controller') 
const authMiddleware = require('../middlewares/auth.middleware')
const constant = require('../config/constant.config');
const paymentMiddleware = require('../middlewares/payment.middleware')

router.post('create',authMiddleware.checkToken(constant.timeExpired),paymentMiddleware.checkIsPaid,completeController.create)

module.exports = router