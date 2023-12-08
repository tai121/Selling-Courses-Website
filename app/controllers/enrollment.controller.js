require('dotenv').config()
const createError = require('http-errors')
const bcrypt = require('bcrypt')
const {timeExpire} = require('../config/constant.config')
const Enrollment = require("../models/enrollment.model")
const Course = require("../models/course.model")
module.exports = {
    create: async (req, res, next) => {
        try {
            const enrollment = new Enrollment(req.body.enrollment)
            await enrollment.save()
            await Course.findByIdAndUpdate(
                req.body.course_id,
                { $push: { enrollments: enrollment._id } },
                { new: true }
            );
            return res.status(200).json({
               'message': 'oke',
                'newToken': res.locals.newToken
            })
        } catch (error) {
            console.log(error.message)
            next(error)
        }
    },
    readById: async (req, res, next) => {
        try {
            const enrollment = await Enrollment.findById(req.params.id)
            if(!enrollment)
                createError(400,'something went wrong')
            return res.status(200).json({
                'message': 'oke',
                 'newToken': res.locals.newToken
             })
        } catch (error) {
            console.log(error.message)
            next(error)
        }
    },
    readByCourseId: async (req, res, next) => {
        try {
            const enrollment = await Enrollment.find({course_id:req.params.course_id,isDelete:false})
            if(!enrollment)
                createError(400,'something went wrong')
            return res.status(200).json({
                'message': 'oke',
                 'newToken': res.locals.newToken
             })
        } catch (error) {
            console.log(error.message)
            next(error)
        }
    },
    readByUserId: async (req,res,next)=>{
        try {
            const enrollment = await Enrollment.find({user_id:req.params.user_id,isDelete:false})
            if(!enrollment)
                createError(400,'something went wrong')
            return res.status(200).json({
               'message': 'oke',
                 'newToken': res.locals.newToken
             })
        } catch (error) {
            console.log(error.message)
            next(error)
        }
    },
    change: async(req,res,next) => {
        try{
            const enrollment = await Enrollment.findById(req.body.enrollment_id)
            if(!enrollment)
                createError(400,'something went wrong')
            Object.assign(enrollment,req.body.enrollment_change)
            enrollment.save()
            return res.status(200).json({
                "message": "oke",
                "newToken": res.locals.newToken
            })
        }catch(error){
            console.log(error.message)
            next(error)
        }
    },
    delete: async(req,res,next) => {
        try{
            await Enrollment.updateOne({_id:req.body.enrollment_id},{isDelete: false})
            return res.status(200).json({
               'message' : 'oke'
            })
        }catch(error){
            console.log(error.message)
            next(error)
        }
    },
}