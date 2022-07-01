const userModel=require('../models/user');
const CustomError=require('../error/custom');
const asyncWrapper = require('../error/asyncWrapper');



const createUserDb=async(data)=>{
    const {email,username,password}=data;
     userModels=new userModel({
        username:username
    });
    const responce=await userModel.register(userModels,password);
    return responce;
}

const getUser=async()=>{

}

const deleteUser=async()=>{

}

const updateUser=async()=>{


}



module.exports={
    getUser,
    deleteUser,
    updateUser,
    createUserDb
    
}
