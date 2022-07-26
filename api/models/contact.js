const mongoose=require('mongoose');

const contactSchema=new mongoose.Schema({
    id1:{
        type:mongoose.Types.ObjectId,
        ref:'User',
        requried:[true,"id1 must be present"],
     
    },
    id2:{
        type:mongoose.Types.ObjectId,
        ref:'User',
        requried:[true,"id2 must be present"],
    
    },
});

contactSchema.index({ id1: 1, id2: 1},{ unique: true });

const Contact=mongoose.model('Contact',contactSchema);

module.exports=Contact;