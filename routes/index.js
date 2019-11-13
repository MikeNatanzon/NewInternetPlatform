var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', {
        layout: 'default',
        template: 'index-template'
    });
});

router.use('/login', require('./login'));

router.use('/signup', require('./signup'));

router.use('/api', require('./api'));

module.exports = router;
