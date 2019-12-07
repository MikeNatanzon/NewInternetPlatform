const mongoose = require('mongoose');

const CategorySchema = new mongoose.Schema({
  name: String,
  parent: [{ 
    type: mongoose.Schema.Types.ObjectId, ref: 'Category' 
  }],
  child: [{ 
    type: mongoose.Schema.Types.ObjectId, ref: 'Category' 
  }],
  categoryRelation: [{
    ratio: Number,
    ratioProgress: [Number],
    counter: Number,
    counterProgress: [Number],
    total: Number,
    totalProgress: [Number]
  }]
}, {collection: 'categories'});

const Category = mongoose.model('Category', CategorySchema);

module.exports = Category;