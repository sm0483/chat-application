
const asyncWrapper = require("../error/asyncWrapper");
const {StatusCodes,getReasonPhrase}=require('http-status-codes');

//TODO
//get user data excluding password
//operation such as update user --> it need password plus already issued token for
//delete user -->it need password + already issued token for 
//create user not allowed



const getUser=asyncWrapper(async(req,res)=>{
    res.status(StatusCodes.OK).json({
        "test":"doo"
    })
    
})

const updateUser=asyncWrapper(async(req,res)=>{

})

const deleteUser=asyncWrapper(async(req,res)=>{


})



module.exports={
    getUser,
    updateUser,
    deleteUser
}