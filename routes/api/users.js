const mongoose = require('mongoose');
const passport = require('passport');
const router = require('express').Router();
const auth = require('../auth');
const Users = mongoose.model('Users');
const errorHandler = require('http-errors');

//POST new user route (optional, everyone has access)
router.post('/', auth.optional, (req, res, next) => {
    const {body: {user}} = req;

    if (!user) {
        return res
            .status(422)
            .json({
                data: null,
                errors: {
                    message: 'User data are required',
                },
                info: null,
                warnings: null
            });
    }

    if (!user.email) {
        return res
            .status(422)
            .json({
                data: null,
                errors: {
                    message: 'Email is required',
                },
                info: null,
                warnings: null
            });
    }

    if (!user.password) {
        return res
            .status(422)
            .json({
                data: null,
                errors: {
                    message: 'Password is required',
                },
                info: null,
                warnings: null
            });
    }

    const finalUser = new Users(user);

    finalUser.setPassword(user.password);

    return finalUser.save()
        .then(() => {
            return res
                .status(200)
                .json({
                    data: {
                        user: finalUser.toAuthJSON()
                    },
                    errors: null,
                    info: null,
                    warnings: null
                });
        });
});

//POST login route (optional, everyone has access)
router.post('/login', auth.optional, (req, res, next) => {
    let {body: {user}} = req;

    if (!user) {
        if (req.body && req.body.email && req.body.password) {
            user = {
                email: req.body.email,
                password: req.body.password
            };
            req.body = {user: user};
        } else {
            return res
                .status(422)
                .json({
                    data: null,
                    errors: {
                        message: 'User data are required'
                    },
                    info: null,
                    warnings: null
                });
        }
    }

    if (!user.email) {
        return res
            .status(422)
            .json({
                data: null,
                errors: {
                    message: 'Email is required'
                },
                info: null,
                warnings: null
            });
    }

    if (!user.password) {
        return res
            .status(422)
            .json({
                data: null,
                errors: {
                    message: 'Password is required'
                },
                info: null,
                warnings: null
            });
    }

    return passport.authenticate('local', {session: false}, (err, passportUser, info) => {
        if (err) {
            return next(err);
        }

        if (passportUser) {
            console.log('Logged user');
            const user = passportUser;
            user.token = passportUser.generateJWT();

            return res
                .status(200)
                .json({
                    data: {
                        user: user.toAuthJSON()
                    },
                    errors: null,
                    info: null,
                    warnings: null
                });
        }

        console.log('Invalid credentials');
        return res
            .status(500)
            .json({
                data: null,
                errors: {
                    message: 'Invalid credentials',
                },
                info: null,
                warnings: null
            });

    })(req, res, next);
});

//POST login route (optional, everyone has access)
router.post('/signup', auth.optional, (req, res, next) => {
    let {body: {user}} = req;

    user = {
        email: req.body.email,
        password: req.body.password,
        password_retype: req.body.password_retype
    };

    if (!user.email) {
        return res
            .status(422)
            .json({
                data: null,
                errors: {
                    message: 'Email is required'
                },
                info: null,
                warnings: null
            });
    }

    if (!user.password) {
        return res
            .status(422)
            .json({
                data: null,
                errors: {
                    message: 'Password is required'
                },
                info: null,
                warnings: null
            });
    }

    if (!user.password_retype) {
        return res
            .status(422)
            .json({
                data: null,
                errors: {
                    message: 'Password retype is required'
                },
                info: null,
                warnings: null
            });
    }

    if (user.password_retype !== user.password) {
        return res
            .status(422)
            .json({
                data: null,
                errors: {
                    message: 'Passwords do not match'
                },
                info: null,
                warnings: null
            });
    }

    let strengthValue = {
        'caps': false,
        'length': false,
        'special': false,
        'numbers': false,
        'small': false
    };

    if (user.password.length >= 8) {
        strengthValue.length = true;
    }

    for (let index = 0; index < user.password.length; index++) {
        let char = user.password.charCodeAt(index);

        if (!strengthValue.caps && char >= 65 && char <= 90) {
            strengthValue.caps = true;
        } else if (!strengthValue.numbers && char >= 48 && char <= 57) {
            strengthValue.numbers = true;
        } else if (!strengthValue.small && char >= 97 && char <= 122) {
            strengthValue.small = true;
        } else if (!strengthValue.numbers && char >= 48 && char <= 57) {
            strengthValue.numbers = true;
        } else if (!strengthValue.special && (char >= 33 && char <= 47) || (char >= 58 && char <= 64)) {
            strengthValue.special = true;
        }
    }

    if (!(strengthValue.caps && strengthValue.length && strengthValue.special && strengthValue.numbers && strengthValue.small)) {
        return res
            .status(422)
            .json({
                data: null,
                errors: {
                    message: 'Password should contain at least 8 alpha-numeric characters with at least one uppercase, one number, and one special character'
                },
                info: null,
                warnings: null
            });
    }

    var mongoUtil = require('../../config/mongoUtil');
    var db = mongoUtil.getDb();

    //db.collection('Users').find();

    //console.log("*** " + user.email);

    Users.findOne({email: user.email})
        .then((doc) => {
            if (doc) {
                // console.log("MVMVMV ~~~~~~~~~~~~~ user already exists");

                return res
                    .status(422)
                    .json({
                        data: null,
                        errors: {
                            message: 'User already exists'
                        },
                        info: null,
                        warnings: null
                    });

            } else {
                // console.log("MVMVMV ~~~~~~~~~~~~~ no data exist for this id");


                var doc = new Users({email: user.email, hash: user.password, salt: user.password});
                doc.setPassword(user.password);

                // save model to database
                doc.save(function (err, doc) {

                    if (err) return console.error(err);
                    return res
                        .status(200)
                        .json({
                            data: {
                                message: 'Congrats, you are now an esteemed NewInternet member.'
                            },
                            errors: null,
                            info: null,
                            warnings: null
                        });

                });

            }
        })
        .catch((err) => {
            console.log(err);
        });

    // a document instance

});

//GET current route (required, only authenticated users have access)
router.get('/current', auth.required, (req, res, next) => {
    const {payload: {id}} = req;

    return Users.findById(id)
        .then((user) => {
            if (!user) {
                return res
                    .status(400)
                    .json({
                        data: null,
                        errors: {
                            message: 'User not logged'
                        },
                        info: null,
                        warnings: null
                    });
            }

            return res
                .status(200)
                .json({
                    data: {
                        user: user.toAuthJSON()
                    },
                    errors: null,
                    info: null,
                    warnings: null
                });
        });
});

module.exports = router;
