const messageModel=require('../models/message');

const createMessageDb=async(data)=>{
    const {senderId,reciverId,message}=data;
    const newMessage=await messageModel.create({
        message:message,
        senderId:senderId,
        reciverId:reciverId
    });
    return newMessage;

}

const clearDb=async()=>{
    const responce=await messageModel.deleteMany({});
    return responce;
}


// {contact:{$in:userId}}

const deleteMessageDb=async(messageId)=>{
    const response=await messageModel.findOneAndDelete({_id:messageId});
    return response;

}

const getMessageByUserid=async(senderId,reciverId)=>{
    const messageArray=[];
    const response1=await messageModel.find({senderId:senderId} && {reciverId:reciverId} );
    const response2=await messageModel.find({senderId:reciverId} && {reciverId:senderId});
    messageArray.push(response1);
    messageArray.push(response2);
    return messageArray;

}

const getMessageDbByMessageId=async(messageId)=>{
    const getMessage=await messageModel.findOne({_id:messageId});
    return getMessage;

}

module.exports={
    createMessageDb,
    deleteMessageDb,
    getMessageByUserid,
    getMessageDbByMessageId,
    clearDb
}

