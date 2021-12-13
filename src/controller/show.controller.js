const express = require("express");

const mongoose = require("mongoose");

const Show = require("../models/show.model");

const router = express.Router();

//to post seats for a particular show
router.post("/", async(req,res) => {
    try{
        const shows = await Show.create(req.body);
        return res.status(201).send({shows});
    }catch(err){
        return res.status(500).send({message: err.message});
    }
})

//to get total seats and details of a show
router.get('/',async(req,res) => {
    try{
        const screen = await Show.find({}).lean().exec();
        return res.status(201).json({screen});
}catch(err) {
    res.status(500).json({err: err.message});
}
})
module.exports = router;