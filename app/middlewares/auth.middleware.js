const jwt = require('jsonwebtoken')
require('dotenv').config()
const createError = require('http-errors')
// const {timeExpire} = require('../config/constant.config')
const User = require('../models/user.model')
const bcrypt = require('bcrypt')
const constant = require('../config/constant.config')

module.exports = {
    checkPassword :  async(req, res, next) => {
        try{
            const email = req.body.email
            const user = await User.findOne({'email': email})
            if(!user)
                throw createError(403, 'some thing went wrong')

            //compair with db
            let isMatch = await bcrypt.compare(req.body.password, user.password)
            if(!isMatch)
                throw createError(403, 'password was wrong')
            // console.log(req.body.email)
            next()
        } catch (error) {
            console.log(error.message)
            next(error)
        }
    },
    checkToken : (time) => {
        return (req, res, next) => {
            try {
                // console.log(req.body)
                const authHeader = req.body.authorization
                // console.log(req.body.email)
                if (!authHeader)
                    throw createError(403,'Something went wrongs')
                const token = authHeader.split(" ")[1]
                // console.log(token)
                jwt.verify(token, process.env.APP_SECRET, (err, decoded) => {
                    if (err) 
                        throw err
                res.locals.userInfo = decoded
                // console.log(decoded)
                let tokenReGen = jwt.sign({
                    _id: decoded._id,
                    roles : decoded.roles,
                    username: decoded.username,
                    profile: decoded.profile,
                    name: decoded.name,
                    email: decoded.email
                },
                process.env.APP_SECRET,{
                    expiresIn: time
                })
                // console.log(tokenReGen)
                res.locals.newToken = `Bearer ${tokenReGen}`
                next()
                })
            } catch (error) {
                console.log(error.message)
                next(error)
            }
        }
    },

    checkRole: (requireRole) => {
        return (req, res, next) => {
            try {
                // console.log(req.body.email)
                let userInfo = res.locals.userInfo
                let listRole = userInfo.roles.split(',')
                if(listRole.includes(requireRole))
                    next()
                else
                throw createError(403,"You don't have role to do this!!!")
            } catch (error) {
                console.log(error.message)
                next(error)
            }  
        }

    },
    checkIsUserOrAdmin: async (req, res, next) => {
        try {
            let userInfo = res.locals.userInfo
            let listRole = userInfo.roles.split(',')
            if(user_id!==res.locals.userInfo._id&&listRole.includes(constant.addminRole))
                throw createError(403,"You don't have role to do this!!!")
            next()
        } catch (error) {
            console.log(error.message)
            next(error)
        }
    },
}