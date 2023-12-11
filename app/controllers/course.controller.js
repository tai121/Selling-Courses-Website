require('dotenv').config()
const createError = require('http-errors')
const bcrypt = require('bcrypt')
const {timeExpire} = require('../config/constant.config')
const Course = require("../models/course.model")
const Review = require("../models/review.model")
const Topic = require("../models/topic.model")
module.exports = {
    createCourse : async(req, res, next) => {
        try {
            const course = new Course(req.body)
            course.isDelete = false
            course.author_id = res.locals.userInfo._id
            await course.save()
            return res.status(200).json({
                'message': 'oke',
                'newToken': res.locals.newToken
            })
        } catch (error) {
            console.log(error.message)
            next(error)
        }
    },
    getCourseById : async(req, res, next) => {
        try{
            const courseId = req.body.courseId
            const course = await Course.findById(courseId)
            .populate({
                path: 'chapters',
                model: 'Chapter',
                populate: {
                    path: 'lessons',
                    model: 'Lesson',
                    select: '-link'
                },
            })
            if(!course)
                throw createError(400,'something went wrong')
            return res.status(200).json({
                'message':'oke',
                'course_data': course,
                'newToken': res.locals.newToken,
            })

        } catch (error) {
            console.log(error.message)
            next(error)
        }
    },
    changeCourse: async(req,res,next) => {
        try{
            const course = await Course.findById(req.body.courseChanged._id)
            .populate({
                path: 'author_id',
                select: "_id"
            })
            .exec()
            if(!course)
                createError(400,'something went wrong')
            if(res.locals.userInfo._id !== course.author_id._id.toString())
                throw createError(400,'you don\'t have roles to do this')
            Object.assign(course,req.body.courseChanged)
            course.save()
            return res.status(200).json({
                "message": "oke",
                "newToken": res.locals.newToken
            })
        }catch(error){
            console.log(error.message)
            next(error)
        }
    },
    deleteCourse: async(req,res,next) => {
        try{
            await Course.updateOne({_id:req.body.courseId},{isDelete: true})
            // return res.status(200).json({
            //     'message' : 'oke'
            // })
            next()
        }catch(error){
            console.log(error.message)
            next(error)
        }
    },
    getAllCourseByAuthor: async(req,res,next)=>{
        try{
            // console.log("test")
            courses = await Course.find({
                author_id: req.body.author_id,
                isDelete: false,
            })
            if(!courses || courses.length === 0)
                throw createError('400','This author created no course')
            return res.status(200).json({
                'message': 'oke',
                courses,
            })

        }catch(error){
            console.log(error.message)
            next(error)
        }
    },
    getAllCourseByTag: async(req,res,next) =>{
        try{
            const courses = await Course.find({
                tags: { $in: req.body.tags },
                isDelete: false,
            })
            if(!courses || courses.length === 0)
                throw createError('400','There is no course for this tags')
            return res.status(200).json({
                'message': 'oke',
                courses,
            })

        }catch(error){
            console.log(error.message)
            next(error)
        }
    },
    getAllCourseByCategory: async(req,res,next)=>{
        try{
            const courses = await Course.find({
                categories:{$in: req.body.categories},
                isDelete: false,
            })
            if(!courses || courses.length === 0)
                throw createError('400','There is no course for this categories')
            return res.status(200).json({
                'message': 'oke',
                courses,
            })

        }catch(error){
            console.log(error.message)
            next(error)
        }
    },
    searchCourseByKeyword: async(req,res,next) =>{
        try{
            const courses = await Course.find({
                title: { $regex: new RegExp(req.body.keyword, 'i') }, 
                isDelete: false,
            }).exec();
    
            if (!courses || courses.length === 0) {
                throw createError('400','There is no course for this keyword')
            }
            return res.status(200).json({
                'message': 'oke',
                courses,
            })
        }catch(error){
            console.log(error.message)
            next(error)
        }
    },
    getFullCourseData: async (req, res,next) =>{
        try{
            const courseId = req.body.courseId
            const course = await Course.findById(courseId)
            .populate({
                path: 'chapters',
                model: 'Chapter',
                populate: {
                    path: 'lessons',
                    model: 'Lesson',
                },
            })
            if(!course)
                throw createError(400,'something went wrong')
            return res.status(200).json({
                'message':'oke',
                'course_data': course,
                'newToken': res.locals.newToken,
            })

        } catch (error) {
            console.log(error.message)
            next(error)
        }
    },
    getAllCourse: async (req, res,next) =>{
        try{
            const courseId = req.body.courseId
            const course = await Course.find({isDelete:false})
            .populate({
                path: 'chapters',
                model: 'Chapter',
                populate: {
                    path: 'lessons',
                    model: 'Lesson',
                    select: '-link',
                },
            })
            .populate({
                path: 'reviews',
                model: 'Review'
            })
            if(!course)
                throw createError(400,'something went wrong')
            return res.status(200).json({
                'message':'oke',
                'course_data': course,
                'newToken': res.locals.newToken,
            })

        } catch (error) {
            console.log(error.message)
            next(error)
        }
    },
    getAllCourseAdmin: async (req, res,next) =>{
        try{
            const courseId = req.body.courseId
            const course = await Course.find({isDelete:false})
            .populate({
                path: 'chapters',
                model: 'Chapter',
                match: { isDelete: false },
                populate: {
                    match: { isDelete: false },
                    path: 'lessons',
                    model: 'Lesson',
                },
            })
            .populate({
                path: 'reviews',
                model: 'Review',
                populate:{
                    path: "topic_id",
                    model: "Topic",
                }
            })
            .populate({
                path: "payments",
                model: "Payment"
            })
            if(!course)
                throw createError(400,'something went wrong')
            return res.status(200).json({
                'message':'oke',
                'course_data': course,
                'newToken': res.locals.newToken,
            })

        } catch (error) {
            console.log(error.message)
            next(error)
        }
    },
}