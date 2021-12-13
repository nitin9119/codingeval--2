const express = require("express");

const mongoose = require("mongoose");

const Screen = require("../models/screen.model");

const router = express.Router();

router.post("/", async(req,res) => {
    try{
        const screens = await Screen.create(req.body);
        return res.status(201).send(screens);
    }catch(err){
        return res.status(500).send({message: err.message});
    }
})

router.get('/',async(req,res) => {
    try{
        const screen = await Screen.find({}).lean().exec();
        return res.status(201).json({screen});
}catch(err) {
    res.status(500).json({err: err.message});
}
})
module.exports = router;