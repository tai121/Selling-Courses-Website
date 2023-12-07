require('dotenv').config()
const createError = require('http-errors')
const bcrypt = require('bcrypt')
const {timeExpire} = require('../config/constant.config')
const Complete = require("../models/complete.model")

module.exports = {
    create: async (req,res,next) => {
        try{
            const complete = new Complete()
            complete.user_id = user
            await complete.save()
            return res.status(200).json({
               'message': 'oke',
                'newToken': res.locals.newToken
            })
        }catch (error) {
            console.log(error.message)
            next(error)
        }
    },
    // read: async(req, res, next) =>{
    //     try{
            
    //     }
    // }
}