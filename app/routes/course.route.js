const mongoose = require('mongoose');
const User = require('../models/user.model')
const express = require('express')
const router = express.Router()
const courseController = require('../controllers/course.controller') 
const authMiddleware = require('../middlewares/auth.middleware')
const constant = require('../config/constant.config');
const courseMiddleware = require('../middlewares/course.middleware');

router.post('/newcourse',authMiddleware.checkToken(constant.timeExpire),authMiddleware.checkRole(constant.instructorRole),courseController.createCourse)

router.post('/getcoursebyid',courseController.getCourseById)

router.post('/changecourse',authMiddleware.checkToken(constant.timeExpire),authMiddleware.checkRole(constant.instructorRole),courseController.changeCourse)

router.post('/deletecourse',authMiddleware.checkToken(constant.timeExpire),authMiddleware.checkRole(constant.instructorRole), courseController.deleteCourse,courseController.getAllCourseAdmin)

router.post('/getallcoursebyauthor', courseController.getAllCourseByAuthor)

router.post('/getallcoursebytag', courseController.getAllCourseByTag)

router.post('/getallcoursebycategory', courseController.getAllCourseByCategory)

router.post('/searchcoursebykeyword', courseController.searchCourseByKeyword)

router.post('/getfullcoursebyid',authMiddleware.checkToken(constant.timeExpire),courseMiddleware.checkPayCreateAdmin,courseController.getFullCourseData)

router.post('/getallcourse',courseController.getAllCourse)

router.post('/getallcourseadmin',authMiddleware.checkToken(constant.timeExpire),authMiddleware.checkRole(constant.addminRole),courseController.getAllCourseAdmin)


module.exports = router

