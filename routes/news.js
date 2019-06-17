const express = require('express');
const router = express.Router();
const NewsService = require('../services/news');
const newsService = new NewsService();

const AuthService = require('../services/auth');
const authService = new AuthService();

const passport = require('passport');
const passportJWT = require("passport-jwt");

const JWTStrategy   = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;

const mongoose = require('mongoose');
const userSchema = require('../models/user');
const User = mongoose.model('users', userSchema,'users');

passport.use('is-authorized', new JWTStrategy({
    jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
    secretOrKey   : 'thisisatestsecretkey'
},
function (jwtPayload, done) {
    User.findOne({_id: jwtPayload.user}, function(err, user) {
        if (err) {
            return done(err, false);
        }
        if (user) {
            return done(null, user);
        } else {
            return done(null, false);
            // or you could create a new account
        }
    });
}
));

router.put('/:id', passport.authenticate('is-authorized', { session: false }), updateNews);
router.delete('/:id', passport.authenticate('is-authorized', { session: false }), deleteNews);
router.post('/', passport.authenticate('is-authorized', { session: false }), addNews);

router.get('/:id', getSingleNews);
router.get('/', getAllNews);


async function updateNews(req,res,next){
    try{
        const result = await newsService.updateNews(req.params.id, req.body);
        res.status(200).send(result); 
    }catch(err){
        next(err);
    }
}

async function deleteNews(req,res,next){
    try{
        const deletedNews = await newsService.deleteNews(req.params.id);
        res.status(200).send(deletedNews);
    }catch(err){
        next(err);
    }
}

async function addNews(req,res,next){ 
    try{
        const result = await newsService.addNews(req.body);
        res.status(201).send(result);
    }catch(err){
        next(err);
    }
    
}

async function getSingleNews(req,res,next){
    try{
        const result = await newsService.getNewsById(req.params.id);
        res.status(200).send(result);
    }catch(err){
        next(err);
    }
}

async function getAllNews(req,res,next){
    const result = await newsService.getAllNews();
    res.status(200).json(result);
}


module.exports = router;