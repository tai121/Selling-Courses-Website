const mongoose = require('mongoose')
const reviewSchema = new mongoose.Schema({
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    course_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Course' },
    rating: Number,
    review_text: String,
    review_date: Date,
    key_words: [
      {type: String,}
    ],
    perc_contribution: Number,
    topic_id:{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Topic',
    }
    
  },{timestamps:true});

const Review = mongoose.model('Review', reviewSchema);
module.exports = Review

