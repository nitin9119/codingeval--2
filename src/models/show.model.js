const { Schema, model} = require("mongoose");

const showSchema = new Schema({
    timing:{type: Number,required: true},
    movies:{
        type: Schema.Types.ObjectId,
        ref:"movies",
        required: true},
    total_seats:{type: Number,required: true},
    screen:{
        type: Schema.Types.ObjectId,
        ref:"screen",
        required: false},
},{
    versionKey:false,
    timestamps:true
}
);

module.exports = model("show",showSchema);