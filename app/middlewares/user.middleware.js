const jwt = require('jsonwebtoken')
require('dotenv').config()
const createError = require('http-errors')
const {timeExpire} = require('../config/constant.config')
const User = require('../models/user.model')

module.exports = {
    changeUser: async (findKey, valueChange)=>{
        const user = await User.find({...findKey})
        console.log(user)
        if(user == null)
            throw createError(403, "user's not found")
        for(const key in valueChange){
            user[key] = valueChange[key]
        }
        await user.save()
    }
}