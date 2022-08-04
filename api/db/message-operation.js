const messageModel=require('../models/message');

const createMessageDb=async(data)=>{
    const {messageId,senderId,message}=data;
    const response=await messageModel.create(data);
    return response;
}

const clearDb=async()=>{
    const responce=await messageModel.deleteMany({});
    return responce;
}


// {contact:{$in:userId}}

const deleteMessageDb=async(messageId)=>{
    //TODO
}


const getAllMessageDb=async(data)=>{
    const response=await messageModel.find(data).sort({date:-1});
    return response;
}



module.exports={
    createMessageDb,
    deleteMessageDb,
    getAllMessageDb,
    clearDb
}

