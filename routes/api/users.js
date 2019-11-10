const mongoose = require('mongoose');
const passport = require('passport');
const router = require('express').Router();
const auth = require('../auth');
const Users = mongoose.model('Users');
const errorHandler = require('http-errors');

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

        return next(errorHandler(401, 'Invalid credendials'));
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
            errors: 'Email is required'
        });
    }

    if(!user.password) {
        return res.status(422).json({
            errors: 'Password is required'
        });
    }    


    if(!user.password_retype) {
        return res.status(422).json({
            errors: 'Password retype is required'
       });
    }    

    if(user.password_retype!==user.password) {
        return res.status(422).json({
            errors: 'Passwords do not match'
        });
    } 

    let strengthValue = {
      'caps': false,
      'length': false,
      'special': false,
      'numbers': false,
      'small': false
    };

    if(user.password.length >= 8) {
        strengthValue.length = true;
    }

    for(let index=0; index < user.password.length; index++) {
          let char = user.password.charCodeAt(index);

          if(!strengthValue.caps && char >= 65 && char <= 90) {
              strengthValue.caps = true;
          } else if(!strengthValue.numbers && char >=48 && char <= 57){
            strengthValue.numbers = true;
          } else if(!strengthValue.small && char >=97 && char <= 122){
            strengthValue.small = true;
          } else if(!strengthValue.numbers && char >=48 && char <= 57){
            strengthValue.numbers = true;
          } else if(!strengthValue.special && (char >=33 && char <= 47) || (char >=58 && char <= 64)) {
            strengthValue.special = true;
          }
    }
    
    if (!(strengthValue.caps && strengthValue.length && strengthValue.special && strengthValue.numbers && strengthValue.small))
    {
        return res.status(422).json({
            errors: 'Password should contain at least 8 alpha-numeric characters with at least one uppercase, one number, and one special character'
        });
    }


    var mongoUtil = require('../../config/mongoUtil');
    var db = mongoUtil.getDb();

   //db.collection('Users').find();

    //console.log("*** " + user.email);

   Users.findOne({ email: user.email }) 
    .then((doc) => {
       if (doc) {
           // console.log("MVMVMV ~~~~~~~~~~~~~ user already exists");


            return res.status(422).json({
               errors: 'User already exists'
            });

       } else {
            // console.log("MVMVMV ~~~~~~~~~~~~~ no data exist for this id");


            var doc = new Users({ email: user.email, hash: user.password, salt: user.password});
            doc.setPassword(user.password);

            // save model to database
            doc.save(function (err, doc) {

            if (err) return console.error(err);
            //console.log(doc.email + " saved to users collection.");

            return res.status(200).json({
                status: 'Congrats, you are now an esteemed NewInternet member.',
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
