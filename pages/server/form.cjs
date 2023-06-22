const mongoose = require('mongoose');
const Schema = mongoose.Schema

const UserSchema = new Schema({
    
    name:{
        type:String,
    },
    email:{
        type:String,
    },
    twitter:{
        type:String,
    }
})

const UserModel = mongoose.model("user", UserSchema)
module.exports = UserModel