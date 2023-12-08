const jwt = require('jsonwebtoken')
require('dotenv').config()
const createError = require('http-errors')
const User = require('../models/user.model')
const Course = require('../models/course.model')
const Payment = require('../models/payment.model')
const constant = require('../config/constant.config')

module.exports = {
    checkUserHaveCourse: async(req, res, next) =>{
        try{
            const course = await Course.findById(req.body.course_id)
            // console.log(course.author_id, res.locals.userInfo._id)
            let userInfo = res.locals.userInfo
                let listRole = userInfo.roles.split(',')
            if(course.author_id.toString()!==res.locals.userInfo._id &&!listRole.includes(requireRole))
                throw createError(400,'you don\'t have role to do this!')

            next()
        }catch (error) {
            console.log(error.message)
            next(error)
        }
        
    },
    //TODO create is paid or owned course or administrators
    checkPayCreateAdmin: async(req, res, next) =>{
        try{
            
            const courseId = req.body.course_id
            const course = await Course.findById(courseId)
            // console.log(course)
            if(!course)
                throw createError(400,"course is not exist")
            const payment = await Payment.find({course_id: req.body.courseId,userId: res.locals.userInfo._id})
           
            let listRole = res.locals.userInfo.roles.split(',')
            // console.log(course)
            if(course.author_id===res.locals.userInfo._id||payment!==null||listRole.includes(constant.addminRole))
                next()

        }catch (error) {
            console.log(error.message)
            next(error)
        }
        
    },
}