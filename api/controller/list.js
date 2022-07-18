const { StatusCodes } = require("http-status-codes");
const { getUsersDb } = require("../db/db-operation")
const asyncWrapper = require("../error/asyncWrapper")


const getUsers=asyncWrapper(async(req,res)=>{
    const response=await getUsersDb();
    res.status(StatusCodes.OK).json({
        "message":response,
        "status":StatusCodes.OK
    })
})

module.exports={
    getUsers
};