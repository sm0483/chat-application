
const asyncWrapper = require("../error/asyncWrapper");
const {StatusCodes,getReasonPhrase}=require('http-status-codes');
const { getUserByQuery, updateUserDb } = require("../db/db-operation");

//TODO
//get user data excluding password
//operation such as update user --> it need password plus already issued token for
//delete user -->it need password + already issued token for 
//create user not allowed



const getUser=asyncWrapper(async(req,res)=>{
    const userId=req.user.userId;
    const userData=await getUserByQuery({_id:userId});
    console.log(userData);
    res.status(StatusCodes.OK).json({
        "username":userData.username,
        "email":userData.email,
    })
    
})

const updateUser=asyncWrapper(async(req,res)=>{
    const userId=req.user.userId;
    const updatedUser=await updateUserDb(userId);
})

const deleteUser=asyncWrapper(async(req,res)=>{



})



module.exports={
    getUser,
    updateUser,
    deleteUser
}