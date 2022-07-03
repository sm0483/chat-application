const userModel=require('../models/user');
const CustomError=require('../error/custom');


const createUserDb=async(data)=>{ 
    const {username,password}=data;
     userModels=new userModel({
        username:username
    });
    const responce=await userModel.register(userModels,password);
    return responce;
}

const deleteUserDb=async(userId)=>{
    const responce=await userModel.findOneAndDelete({_id:userId});
    return responce;
}

const updateUserDb=async(data)=>{
    const {userId,newUserName}=data;
    const responce=await userModel.findOneAndUpdate({_id:userId},{username:newUserName},{runValidators:true,new:true});
    return responce;   
}

const getUserDb=async(userId)=>{
    const responce=await userModel.findOne({_id:userId});
    return responce;
}

const clearDb=async()=>{
    const responce=await userModel.findOneAndDelete({});
    return responce;
}


module.exports={
    createUserDb,
    deleteUserDb,
    updateUserDb,
    getUserDb,
    clearDb
}
