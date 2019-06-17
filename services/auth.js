
const mongoose = require('mongoose');
const userScheme = require('../models/user');
const User = mongoose.model('users', userScheme);
const jwt= require('jsonwebtoken');
const bcrypt = require('bcrypt');
class AuthService{

    constructor(){
        this.auth = User;
    }

    validateUserDetails(user){
        if(!user.username){
            throw new Error('Username is Required');
        }

        if(!user.password){
            throw new Error('Password is Required');
        }

        if(!user.name){
            throw new Error('Name is Required');
        }
    }

    generateToken(userid){
        return jwt.sign({ user: userid}, "thisisatestsecretkey", { expiresIn: 60*60 });
    }

    login(user){
        const token = this.generateToken(user._id);
        return { user, token: token};
    }

    async register(userDetails){
        this.validateUserDetails(userDetails);

        const user = await User.findOne({ username: userDetails.username });

        console.log(user);

        if(user) { throw new Error('User Already Exists'); }

        const newUser = new User({
            "name": userDetails.name,
            "username": userDetails.username,
            "password": bcrypt.hashSync(userDetails.password, bcrypt.genSaltSync(10))
        })

        const nUser = await this.auth.create(newUser);
        const token = this.generateToken(nUser._id);
        return { nUser, token: token };
        
    }
}

module.exports = AuthService;