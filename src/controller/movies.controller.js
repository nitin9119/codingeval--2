const express = require("express");

const Movie = require("../models/movies.model");

const authenticate = require("../middlewares/authenticate");

const router = express.Router();

router.post("/",authenticate,async (req,res)=>{
    try{
        const user = req.user;

        const movies = await Movie.create({
            movie_name: req.body.movie_name,
            actors: req.body.actors,
            lauguage: req.body.laguage,
            director: req.body.director,
            poster_url: req.body.poster_url,
            user:user.user._id,

        });

        res.status(201).json(movies);
    }catch(err){
        res.status(500).json({error: err.message});
    }
});


//TO GET ALL MOVIES REQUEST
router.get("/",async(req, res)=>{
    try{
        const movies = await Movie.find({}).lean().exec();

        res.status(201).json({ movies: movies})
    }catch(err){
        res.status(500).json({ err: err.message});
    }
})

module.exports = router;