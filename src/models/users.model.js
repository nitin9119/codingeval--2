const bcrypt = require("bcryptjs");

const { model,Schema } = require("mongoose");

const userSchema = new Schema({
    //name: {type: String, required: true},
    email: {type: String, required: true,unique: true},
    password: {type: String, required: true},
    //profile_photo_urls:[{type: String, required: false}],
    //roles: {type: String, required:false}
},{
    versionKey:false,
    timestamps:true,
}
);

userSchema.pre("save",function (next){

    if(!this.isModified("password")) return next;

    bcrypt.hash(this.password,10,(err,hash)=>{
        this.password = hash;
        return next();
    });
});

userSchema.methods.checkPassword = function(password){
    return new Promise((resolve, reject)=>{
        bcrypt.compare(password, this.password, function(err, same){
            if(err) return reject(err);

            return resolve(same);
        });
    })
}

module.exports = model("User",userSchema);