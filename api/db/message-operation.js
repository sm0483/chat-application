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
    const query={
        $or:[
            {
                $and:[{senderId:reciverId},{reciverId:senderId}]
            },
            {
                $and:[{senderId:senderId},{reciverId:reciverId}]
            }
        ]
    }
    //structure of query
    //{senderId:senderId} && {reciverId:reciverId} || {senderId:reciverId} && {reciverId:senderId}
    const response=await messageModel.find(query);
    return response;

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

