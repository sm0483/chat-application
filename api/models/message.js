const mongoose=require('mongoose');

// function sizeValidate(val){
//     return val.length===2;
// }


// const custom=[sizeValidate,'size limit exeeded'];


const messageSchema=new mongoose.Schema({
    contactId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Contact",
        required:[true,'Contact id shoud present']
    },
    senderId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:[true,'SenderId is must']
    },
    message:{
        type:String,
        required:[true,'SenderId is must']
    }

},{timestamps:true});


const Message=mongoose.model("Message",messageSchema);

module.exports=Message;