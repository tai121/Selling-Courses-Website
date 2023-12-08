const { Schema, model } = require("mongoose");
const mongoose = require('mongoose')

const lessonSchema = new Schema({
    title: {
      type: String,
      required: true,
    },
    link: {
      type: String,
      required: true,
    },
    order: {
      type: Number,
      required: true,
    },
    chapter_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Chapter' },
    order: Number, // Lesson order within the course
    isDelete:{
      type: Boolean,
      required: true,
      default: false,
    },
    
  },
  {timestamps:true}
  )



module.exports = model("Lesson", lessonSchema)