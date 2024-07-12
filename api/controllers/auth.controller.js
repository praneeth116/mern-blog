import User from "../models/user.model.js"
import { errorHandler } from "../utils/error.js";
import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';

export const signUp = async(req, res, next) => {
    const {username, email, password} = req.body;
    if(!username || !email || !password || username==='' || email==='' || password===''){
        return next(errorHandler(400,"All fields are required"));
    }
    const hashedPassword = bcryptjs.hashSync(password,10);
    const newUser = new User({
        username,
        email,
        password: hashedPassword,
    });

    try{
        await newUser.save();
        res.json('SignUp successful');
    }catch(err){
        next(err);
    }
};

export const signIn = async(req, res, next) => {
    const {email, password} = req.body;
    if(!email || !password || email==="" || password===""){
        return next(errorHandler(400,"All fields are required"));
    }
    
    try{
        const validUser = await User.findOne({email});
        if(!validUser){
            return next(errorHandler(404,"User not found"));
        }
        const validPassword = bcryptjs.compareSync(password, validUser.password);
        if(!validPassword){
            return next(errorHandler(400,"Invalid Password"));
        }
        //we need to authenticate the user now as both email and password are correct.
        //_id is unique for each of the user
        const token = jwt.sign(
            {id: validUser._id}, process.env.JWT_SECRET
        );
        //We don't want the password in the response.
        const {password: pass, ...rest} = validUser._doc;
        res.status(200).cookie('access_token',token,{httpOnly: true }).json(rest);
    }catch(err){
        next(err);
    }
};

export const google = async(req, res, next) => {
    const {name, email, googlePhotoUrl} = req.body;
    try{
        const user = await User.findOne({email});
        if(user){
            const token = jwt.sign({id: user._id}, process.env.JWT_SECRET);
            const {password, ...rest} = user._doc;
            res.status(200).cookie('access_token', token, {httpOnly: true}).json(rest);
        }
        else{
            const generatedPassword = Math.random().toString(18).slice(-8) + Math.random().toString(18).slice(-8);
            const hashedPassword = bcryptjs.hashSync(generatedPassword, 10);
            const newUser = new User({
                username: name.toLowerCase().split(' ').join('') + Math.random().toString(9).slice(-3),
                email,
                password: hashedPassword,
                profilePicture: googlePhotoUrl
            });
            newUser.save();
            const token = jwt.sign({id: newUser._id}, process.env.JWT_SECRET);
            const {password, ...rest} = newUser._doc;
            res.status(200).cookie('access_token', token, {httpOnly: true}).json(rest);
        }
    }
    catch(err){
        next(err);
    }
};