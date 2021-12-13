const express = require("express");

const mongoose = require("mongoose");

const Theatre = require("../models/theatre.model");

const router = express.Router();

router.post("/", async(req,res) => {
    try{
        const theatres = await Theatre.create(req.body);
        return res.status(201).send(theatres);
    }catch(err){
        return res.status(500).send({message: err.message});
    }
})

router.get('/',async(req,res) => {
    try{
        const theatre = await Theatre.find({}).lean().exec();
        return res.status(201).json({theatre});
}catch(err) {
    res.status(500).json({err: err.message});
}
})

module.exports = router;