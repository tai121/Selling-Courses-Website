const mongoose = require('mongoose');
const Enrollment = require('../models/enrollment.model')
const express = require('express')
const router = express.Router()
const reviewController = require('../controllers/review.controller') 
const authMiddleware = require('../middlewares/auth.middleware')
const constant = require('../config/constant.config')
const courseMiddleware = require('../middlewares/course.middleware')


router.post('/read',reviewController.read)

router.post('/create',authMiddleware.checkToken(constant.timeExpire),reviewController.create)

router.post('/update',authMiddleware.checkToken(constant.timeExpire),reviewController.update)

router.post('/delete',authMiddleware.checkToken(constant.timeExpire),reviewController.delete)

module.exports = router