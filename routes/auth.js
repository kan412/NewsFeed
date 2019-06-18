const express = require('express');
const router = express.Router();
const AuthService = require('../services/auth');
const authService = new AuthService();
const mongoose = require('mongoose');
const userSchema = require('../models/user');
const User = mongoose.model('users', userSchema,'users');

const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const bcrypt= require('bcrypt');

router.post('/signin',passport.authenticate('local-signin', { session: false }), loginUser);
router.post('/signup', registerUser);

function loginUser(req,res){
  const result = authService.login(req.user);
  res.send(result);
}

async function registerUser(req,res,next){
  try{
    const result = await authService.register(req.body);
    res.status(201).send(result);
  }catch(err){
    next(err);
  }
  
}

passport.use('local-signin', new LocalStrategy(
  function(username, password, done) {
    User.findOne({ username: username }, function(err, user) {

      if (err) { return done(err); }

      if (!user) {
        return done(null, false, { message: 'Incorrect username.' });
      }

      if ( !bcrypt.compareSync(password, user.password)) {
        return done(null, false, { message: 'Incorrect password.' });
      }

      return done(null, user);
    });
  }
));


module.exports = router;