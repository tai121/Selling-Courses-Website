const { Schema, model } = require("mongoose");
const mongoose = require("mongoose");
const quizSchema = new Schema({
    course_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Course'},
    title: String,
    questions: [
      {
        question_text: String,
        options: [String],
        correct_option: Number,
      },
    ],
    // Other quiz-related data
  });