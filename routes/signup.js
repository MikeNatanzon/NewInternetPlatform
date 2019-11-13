var express = require('express');
var router = express.Router();

/* GET login page. */
router.get('/', function(req, res, next) {
    res.render('signup',  {
        layout: 'default',
        template: 'login-template',
        title: 'Sign-Up Here',
    });
});

module.exports = router;
