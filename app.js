const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');
const mongoose = require('mongoose');
const config = require('./config/database');

mongoose.connect(config.database);

mongoose.connection.on('connected', () => {
	console.log('Connected to database ' + config.database);
})

mongoose.connection.on('error', (err) => { 
	console.log('Error connecting to database ' + err);
})

const app = express();

const users = require('./routes/users');

const port = 8000;

app.use(cors());

app.use(express.static(path.join(__dirname, 'client')));

app.use(bodyParser.json());

//Passport Middleware
app.use(passport.initialize());
app.use(passport.session());

require('./config/passport')(passport);

app.use('/users', users);

app.get('/', (req,res) => {
	res.send('Invalid Endpoint');
});

app.listen(port, () => {
	console.log('app listening on port ' + port);
});
