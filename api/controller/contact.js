const { StatusCodes } = require("http-status-codes");
const asyncWrapper = require("../error/asyncWrapper");

const {    
    createContactDb,
    deleteContactDb,
    getAllMessageIdDb,
    getMessageIdDb
}=require('../db/contact-operation');



const testRoute=asyncWrapper(async(req,res)=>{
    res.status(StatusCodes.OK).json({
        "test":"done",
    })
})

const createContact=asyncWrapper(async(req,res)=>{
    //if already present send back data else create new than send back data
    const isPresent=await getMessageIdDb(req.body);
    if(isPresent && !isPresent.length){
        const response=await createContactDb(req.body);
        return res.status(StatusCodes.OK).json(response);
    }
    return res.status(StatusCodes.OK).json(isPresent[0]);
})

const getAllMessageId=asyncWrapper(async(req,res)=>{
    const senderId=req.params.senderId;
    const response=await getAllMessageIdDb({senderId});
    res.status(StatusCodes.OK).json({
        "message":response,
        "status":StatusCodes.OK
    })
})

const getMessageId=asyncWrapper(async(req,res)=>{
    const senderId=req.params.senderId;
    const reciverId=req.params.reciverId;
    const response=await getMessageIdDb({
        senderId,
        reciverId
    });
    res.status(StatusCodes.OK).json({
        "message":response,
        "status":StatusCodes.OK
    })

})



const deleteContact=asyncWrapper(async(req,res)=>{
    //TODO
})




module.exports={
    testRoute,
    createContact,
    deleteContact,
    getAllMessageId,
    getMessageId,
}