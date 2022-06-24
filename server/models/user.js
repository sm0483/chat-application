const mongoose=require('mongoose');

const userSchema=new mongoose.Schema({
    name:{
        type:String,
        required:[true,"user name cat't be empty"],
        maxLength:50
    },
    email:{
        type:String,
        required:[true,'email cant"t be empty'],
        match: [ /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        'Please provide a valid email'
        ],
        unique:true
    },
    password:{
        type:String,
        required:[true,"password field can't be empty"],
        minLength:8
    }
});

const User=mongoose.model("User",userSchema);
module.exports=User
