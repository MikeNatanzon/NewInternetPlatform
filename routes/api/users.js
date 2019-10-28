const mongoose = require('mongoose');
const passport = require('passport');
const router = require('express').Router();
const auth = require('../auth');
const Users = mongoose.model('Users');

//POST new user route (optional, everyone has access)
router.post('/', auth.optional, (req, res, next) => {
    const { body: { user } } = req;

    if(!user) {
        return res.status(422).json({
            errors: {
                user: 'data are required',
            },
        });
    }

    if(!user.email) {
        return res.status(422).json({
            errors: {
                email: 'is required',
            },
        });
    }

    if(!user.password) {
        return res.status(422).json({
            errors: {
                password: 'is required',
            },
        });
    }

    const finalUser = new Users(user);

    finalUser.setPassword(user.password);

    return finalUser.save()
        .then(() => res.json({ user: finalUser.toAuthJSON() }));
});

//POST login route (optional, everyone has access)
router.post('/login', auth.optional, (req, res, next) => {
    let { body: { user } } = req;

    if(!user) {
        if (req.body && req.body.email && req.body.password) {
            user = {
                email: req.body.email ,
                password: req.body.password
            };
            req.body = {user: user};
        } else {
            return res.status(422).json({
                errors: {
                    user: 'data are required',
                },
            });
        }
    }

    if(!user.email) {
        return res.status(422).json({
            errors: {
                email: 'is required',
            },
        });
    }

    if(!user.password) {
        return res.status(422).json({
            errors: {
                password: 'is required',
            },
        });
    }

    return passport.authenticate('local', { session: false }, (err, passportUser, info) => {
        if(err) {
            return next(err);
        }

        if(passportUser) {
            const user = passportUser;
            user.token = passportUser.generateJWT();

            return res.json({ user: user.toAuthJSON() });
        }

        return status(400).info;
    })(req, res, next);
});

//POST login route (optional, everyone has access)
router.post('/signup', auth.optional, (req, res, next) => {
    let { body: { user } } = req;

    user = {
                email: req.body.email ,
                password: req.body.password ,
                password_retype: req.body.password_retype 
            };

    if(!user.email) {
        return res.status(422).json({
            errors: {
                email: 'is required',
            },
        });
    }

    if(!user.password) {
        return res.status(422).json({
            errors: {
                password: 'is required',
            },
        });
    }    


    if(!user.password_retype) {
        return res.status(422).json({
            errors: {
                password_retype: 'is required',
            },
        });
    }    

    if(user.password_retype!==user.password) {
        return res.status(422).json({
            errors: {
                user: 'passwords mismatch',
            },
        });
    } 

    //TODO - save to passport

    return res.status(200).json({
            status: 'Congrats, you are now an esteemed NewInternet member.',
    });

});


//GET current route (required, only authenticated users have access)
router.get('/current', auth.required, (req, res, next) => {
    const { payload: { id } } = req;

    return Users.findById(id)
        .then((user) => {
            if(!user) {
                return res.sendStatus(400);
            }

            return res.json({ user: user.toAuthJSON() });
        });
});

module.exports = router;
