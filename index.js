'use strict';



const bodyParser = require('body-parser');
const express = require('express');
const app = express();

app.set('port', (process.env.PORT || 5000));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use("/images", express.static(__dirname + '/images'));


app.listen(app.get('port'), function() {
    console.log('The New Internet\'s Merchant Console is running on port', app.get('port'));
  });


  app.get('/', function(req, res) {
    res.sendFile(__dirname + '/index.html');
  });

console.log("YEETUS DELETUS");
