const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema({
  url: String,
  date: {type: Date, default: Date.now },
  author: { 
    type: mongoose.Schema.Types.ObjectId, ref: 'User' 
  },
  title: {
    content: String,                      // by user
    CS: Number,                         // by others
    importance: Number,                  // by user/others
    tone: [String],                     // by user/others
    tonePercent: [Number],              // by user/others
    sources: [String],                  // by user
    confidence: Number,                 // by user
    reference: String,                  // by user
  },
  sentence: [{
    content: String,                    // by user
    CS: Number,                         // by others
    importance: Number,                 // by user/others
    tone: [String],                     // by user/others
    tonePercent: [Number],              // by user/others
    sources: [String],                  // by user
    confidence: Number,                 // by user
    reference: String,                  // by user
    format: String,
  }],
  context: {
    content: String,
    CS: Number,
    importance: Number,                 // by user/others
    sources: [String],                  // by user
    confidence: Number,                 // by user
    reference: String,
  },
  text:  {type: String, default: '' },
  media: [{
    content: String,
    media: String,                      // by user
    CS: Number,                         // by others
    importance: Number,                  // by user/others
    sources: [String],                  // by user
    confidence: Number,                 // by user
    reference: String,                  // media
  }],
  CS: Number,
  PS: Number,
  influence: [String],
  influencePercent: [Number],
  category: [String],
  categoryPercent: [Number],
  categoryRank: [Number],
  location: [String],
  locationPercent: [Number],
  timeStamp: Date,
  comments: [{ 
    type: mongoose.Schema.Types.ObjectId, ref: 'Post' 
  }],
  catCS: [Number],
  catPS: [Number],
  catValue: [Number]
}, {collection: 'posts'});

const Post = mongoose.model('Post', PostSchema);

module.exports = Post;