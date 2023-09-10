const mongoose=require('mongoose');

const userSchema=new mongoose.Schema({
    
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    name:{
        type:String,
        required:true
    }
},{timestamps:true });

const User=mongoose.model("user_sign_up_in",userSchema); //collection name User

module.exports=User;