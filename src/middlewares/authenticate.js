require("dotenv").config();
const jwt = require("jsonwebtoken");

const verifyToken = (token)=>{
    return jwt.verify(token,process.env.JWT_ACCESS_KEY);

}

module.exports = (req,res,next)=>{
    const bearerToken = req?.headers?.authorization

    if(! bearerToken || ! bearerToken.startsWith('Bearer ')) return res.status(400).json({message: 'Invalid bearer token'});

    const token = bearerToken.split(" ")[1];
    const user = verifyToken(token);

    if(!user) return res.status(404).json({message: 'Invalid user'});

    req.user = user;

    return next();
}