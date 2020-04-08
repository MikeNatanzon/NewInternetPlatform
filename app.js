const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const session = require('express-session');
const cors = require('cors');
const mongoose = require('mongoose');
const errorHandler = require('http-errors');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const exphbs = require('express-handlebars');

//Configure mongoose's promise to global promise
mongoose.promise = global.Promise;

const app = express();

//Configure our app
app.use(cors());
app.use(require('morgan')('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({ secret: 'passport-tutorial', cookie: { maxAge: 60000 }, resave: false, saveUninitialized: false }));

//Configure Mongoose
var mongoUtil = require('./config/mongoUtil');

mongoUtil.connectToServer( function( err, client ) {
  if (err) console.log(err);
  // start the rest of your app here
} );

//Models and routes
require('./models/Users');
require('./config/passport');
app.use(require('./routes'));

app.use((req, res, next) => {
  return res
      .status(500)
      .send({
        message: 'Page not found'
      });
});

app.listen(8000, () => console.log('Server running on http://localhost:8000/'));
