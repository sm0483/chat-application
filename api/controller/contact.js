const { StatusCodes } = require("http-status-codes");
const asyncWrapper = require("../error/asyncWrapper");

const {    
    createContactDb,
    deleteContactDb,
    getAllMessageIdDb,
    getMessageIdDb,
    clearDb
}=require('../db/contact-operation');



const testRoute=asyncWrapper(async(req,res)=>{
    res.status(StatusCodes.OK).json({
        "test":"done",
    })
})

const createContact=asyncWrapper(async(req,res)=>{
    const response=await createContactDb(req.body);
    res.status(StatusCodes.OK).json(response);
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
    res.status(StatusCodes.OK).json({
        "test":"done1",
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