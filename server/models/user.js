const mongoose=require('mongoose');
const jwt=require('jsonwebtoken'); 

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

userSchema.pre('save',async function(){
    const salt=await bcrypt.genSalt(10);
    this.password=await bcrypt.hash(this.password,salt);

})

userSchema.methods.createJwt=function(){
    return jwt.sign({
        userId:this._id,
        name:this.name
    },process.env.key,{expiresIn:'30d'})
}



const User=mongoose.model("User",userSchema);
module.exports=User;
