
const asyncWrapper = require("../error/asyncWrapper");
const {StatusCodes,getReasonPhrase}=require('http-status-codes');
const { getUserByQuery, updateUserDb, deleteUserDb } = require("../db/db-operation");

//TODO
//get user data excluding password
//operation such as update user --> it need password plus already issued token for
//delete user -->it need password + already issued token for 
//create user not allowed



const getUser=asyncWrapper(async(req,res)=>{ //auth with normal token
    const userId=req.user.userId;
    const userData=await getUserByQuery({_id:userId});
    res.status(StatusCodes.OK).json({
        "username":userData.username,
        "email":userData.email,
    })
    
})

const updateUser=asyncWrapper(async(req,res)=>{   //auth with super token
    const userId=req.user.userId;
    const updatedUser=await updateUserDb(userId,req.body);
    res.status(StatusCodes.OK).json({
        "username":updatedUser.username,
        "email":updatedUser.email
    })
})

const deleteUser=asyncWrapper(async(req,res)=>{  //auth with super token
    const userId=req.user.userId;
    const deletedUser=await deleteUserDb(userId);
    res.status(StatusCodes.OK).json({
        "username":deletedUser.username,
        "email":deletedUser.email
    })

    
})



module.exports={
    getUser,
    updateUser,
    deleteUser
}