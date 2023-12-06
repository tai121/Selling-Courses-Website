const { Schema, model } = require("mongoose");
const mongoose = require("mongoose");

const enrollmentSchema = new Schema({
    user_id: { 
      type: mongoose.Schema.Types.ObjectId, ref: 'User',
      required: true
    },
    course_id: { 
      type: mongoose.Schema.Types.ObjectId, ref: 'Course',
      required: true,
    },
    enrollment_date: {
      type: Date,
      required: true,
    },
    completed: {
      type: Boolean,
      required: true,
      default: false,
    },
    completion_date: {
      type: Date,
      required: false,
    },
    isDelete: {
      type: Boolean,
      required: true,
      default: false,
    },
    payment_id: {
      type: mongoose.Schema.Types.ObjectId, ref: 'Payment',
      required: false,
    }
  },
{timestamps: true}
)
const Enrollment = model("Enrollment", enrollmentSchema)
module.exports = Enrollment