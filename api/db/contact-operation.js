const contactModel=require('../models/contact');
const CustomError=require('../error/custom');

const createContactDb=async(data)=>{
    const {senderId:id1,reciverId:id2}=data;
    const response=contactModel.create({id1:id1,id2:id2})
    return response;

}


const getAllMessageIdDb=async(data)=>{ //only senderId present
    const {senderId}=data;
    const getAllQuery={
        $or:[
            {id1:senderId},
            {id2:senderId}
        ]
    }
    const response=await contactModel.find(getAllQuery);
    return response;
}

const getMessageIdDb=async(data)=>{  //senderId and reciverId present
    const {senderId,reciverId}=data;

    const getIdQuery={
        $or:[
        {$and:[
            {id1:senderId},
            {id2:reciverId}
        ]},
        {$and:[
            {id1:reciverId},
            {id2:senderId}
        ]}
    ]}
    const response=await contactModel.find(getIdQuery);
    return response;
}



const deleteContactDb=async()=>{
    //TODO

}

const clearDb=async()=>{
    const responce=await contactModel.deleteMany({});
    return responce;
}



module.exports={
    createContactDb,
    deleteContactDb,
    getAllMessageIdDb,
    getMessageIdDb,
    clearDb
}
