const mongoose = require('mongoose');

var _db;

module.exports = {

  connectToServer: function( callback ) {
  	
    _db = mongoose.connect('mongodb://localhost/NewInternetDB', { useUnifiedTopology: true, useNewUrlParser: true }).then(() => {
 	 	console.log("Connected to Database");
 	 	mongoose.set('debug', true);
	}).catch((err) => {
 		 console.log("Not Connected to Database ERROR! ", err);
	});


  },

  getDb: function() {
    return _db;
  }
};