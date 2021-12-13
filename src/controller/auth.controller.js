require("dotenv").config();

const jwt = require("jsonwebtoken");

const User = require("../models/users.model");

const newToken = (user) =>{
    return jwt.sign({user: user}, process.env.JWT_ACCESS_KEY);
}

const register = async(req,res) =>{
    try{
        let user = await User.findOne({ email : req.body.email}).lean().exec();

        if(user) return  res.status(400).json({status : "Failed email already registered"});

        user = await User.create(req.body);

        const token = newToken(user);

        res.status(201).json({user,token});

    }
    catch(err){
        res.status(500).json({"status":"Failed",message: err.message})
    }
}

const login = async (req, res) => {

    try{
        let user = await User.findOne({ email: req.body.email});

        if(!user) return res.status(400).json({ message:"Failed email already exists "});

        const match = await user.checkPassword(req.body.password);

        if(!match) return res.status(400).json({ message:"please enter correct email and password"});

        const token = newToken(user);

        res.status(201).json({user,token});


    }catch(err){
        return res.status(500).json({satus: "Failed",message:err.message});
    }
}

module.exports = {register,login};