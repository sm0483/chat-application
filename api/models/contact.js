const mongoose=require('mongoose');

const contactSchema=new mongoose.Schema({
    contact:{
        type:[String],
        required:[true,"userId not present"],
        validator:function(val){
            if(val.length()!==2){
                return val;
            }
        }
    }
},{timestamps:true});

const Contact=mongoose.model("Conversation",contactSchema);

module.exports=Contact;