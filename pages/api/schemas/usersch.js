import mongoose from "mongoose";

const Schema = mongoose.Schema;

const userSchema = new Schema({
    id:{type:String},
    name:{type:String,required:true,unique:true},
    email:{type:String,required:true,unique:true},
    hashedPassword:{type:String,required:true,minLength:5},
    stripeCustomerId:{type:String,default:''},
    isActive:{type:Boolean, default:false},
    skyEnabled:{type:Boolean, default:false},
    bannerEnabled:{type:Boolean, default:false},
    age: { type: Number, min: 18, max: 65 },
    gender:{type:Array},
    rpmId:{type:String},
    avatarUrl:{type:String},
    image:{type:String},
    maps:{
        owned:[String],
        liked:[String],
    },
    created:{type: Date, default: Date.now},
    banned:{type:Boolean},
    gtime:{type:Number},
})

const User = mongoose.models.User || mongoose.model("User", userSchema);
export default User;