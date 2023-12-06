const mongoose = require('mongoose')
const { Schema, model } = require("mongoose");
const conpleteSchema = new Schema({
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    lesson_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Lesson' },
  },
  {timestamps:true}
  
)


const Complete = model("Complete", conpleteSchema)
module.exports = Complete
