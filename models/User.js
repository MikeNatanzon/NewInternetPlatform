const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: {type: String, required: true },
  email: {type: String, required: true },
  password: {type: String, required: true },
  date: {type: Date, default: Date.now },
  CS: {type: Number, default: '0' },
  PS: {type: Number, default: '0' },
  post: [{type: mongoose.Schema.Types.ObjectId, ref: 'Post'}],
  value: Number,
  catPS: [Number],
  catCS: [Number],
  catValue: [Number],
  preferences: [{
    category: [{type: mongoose.Schema.Types.ObjectId, ref: 'Category'}],
    order: [String]
  }],
  firstName: String,
  lastName: String,
  middleName: String,
  bio: String,
  creditCard: String
}, {collection: 'users'});

const User = mongoose.model('User', UserSchema);

module.exports = User;