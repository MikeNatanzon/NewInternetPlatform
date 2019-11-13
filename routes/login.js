var express = require('express');
var router = express.Router();

/* GET login page. */
router.get('/', function(req, res, next) {
    res.render('login',  {
        layout: 'default',
        template: 'login-template',
        cssFile: 'login',
        jsFile: 'login'
    });
});

module.exports = router;
