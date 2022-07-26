const { StatusCodes } = require("http-status-codes");
const asyncWrapper = require("../error/asyncWrapper");



const testRoute=asyncWrapper(async(req,res)=>{
    res.status(StatusCodes.OK).json({
        "test":"done",
    })
})

const createContact=asyncWrapper(async(req,res)=>{
    res.status(StatusCodes.OK).json({
        "test":"done1",
    })

})

const getAllMessageId=asyncWrapper(async(req,res)=>{
    res.status(StatusCodes.OK).json({
        "test":"done1",
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