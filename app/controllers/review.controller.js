require('dotenv').config()
const createError = require('http-errors')
const bcrypt = require('bcrypt')
const {timeExpire} = require('../config/constant.config')
const Review = require("../models/review.model")
const Course = require("../models/course.model")
const User = require("../models/user.model")
const Topic = require("../models/topic.model")
module.exports = {
    create: async (req, res, next) => {
        try {
            const review = new Review(req.body)
            review.user_id = res.locals.userInfo._id
            await review.save()
            await Course.findByIdAndUpdate(
                req.body.course_id,
                { $push: { reviews: review._id } },
                { new: true }
            );
            console.log(review.user_id)
            await User.findByIdAndUpdate(
                review.user_id,
                { $push: { reviews: review._id } },
                { new: true }
            )
            return res.status(200).json({
              'message': 'oke',
                'newToken': res.locals.newToken
            })
        } catch (error) {
            console.log(error.message)
            next(error)
        }
    },
    read: async (req, res, next) => {
        try {
            const reviews = await Review.find({course_id: req.body.course_id})
            .populate({
                path: 'topic_id',
                model: "Topic"
            })
            return res.status(200).json({
                reviews
            })
        } catch (error) {
            console.log(error.message)
            next(error)
        }
    },
    delete: async(req, res, next)=>{
        try {
            const review = await Review.findByIdAndDelete(req.params.id)
            return res.status(200).json({
                review
            })
        } catch (error) {
            console.log(error.message)
            next(error)
        }
    },
    update: async(req, res, next)=>{
        try {
            const review = await Review.findByIdAndUpdate(req.params.id, req.body)
            return res.status(200).json({
                review
            })
        } catch (error) {
            console.log(error.message)
            next(error)
        }
    },
    
}