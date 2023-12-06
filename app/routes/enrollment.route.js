const mongoose = require('mongoose');
const Enrollment = require('../models/enrollment.model')
const express = require('express')
const router = express.Router()
const enrollmentController = require('../controllers/enrollment.controller') 
const authMiddleware = require('../middlewares/auth.middleware')
const constant = require('../config/constant.config')
const courseMiddleware = require('../middlewares/course.middleware')

//TODO: check payment
router.post('/create',authMiddleware.checkToken(constant.timeExpired),enrollmentController.create)

router.post('/readbyid',authMiddleware.checkToken(constant.timeExpired),courseMiddleware.checkPayCreateAdmin,enrollmentController.readById)

router.post('/readbyuserid',authMiddleware.checkToken(constant.timeExpired),authMiddleware.checkIsUserOrAdmin,enrollmentController.readByUserId)

router.delete('/readbyuserid',authMiddleware.checkToken(constant.timeExpired),authMiddleware.checkRole(constant.addminRole),enrollmentController.delete)

router.post('readbycourseid',authMiddleware.checkToken(constant.timeExpire),authMiddleware.checkRole(constant.addminRole),enrollmentController.readByCourseId)

module.exports = router