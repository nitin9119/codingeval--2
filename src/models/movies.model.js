const { Schema, model} = require("mongoose");

const movieSchema = new Schema({
    movie_name: {type: String, required: true},
    actors:{type: String,required: false},
    language: {type: String, required: false},
    director: {type: String, required: false},
    poster_url:[{type: String, required: false}],
    user:{
        type: Schema.Types.ObjectId,
        ref:"user",
        required: true
    },
},{
    versionKey:false,
    timestamps:true
}
);

module.exports = model("movies",movieSchema);