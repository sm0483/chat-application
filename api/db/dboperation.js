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

const updateUserDb=async(userId,newUser)=>{
    const {username}=newUser;
    const responce=await userModel.findOneAndUpdate({_id:userId},{username:username},{runValidators:true,new:true});
    return responce;   
}

const getUserDb=async(userId)=>{
    const responce=await userModel.findOne({_id:userId});
    return responce;
}

const clearDb=async()=>{
    const responce=await userModel.deleteMany({});
    return responce;
}


module.exports={
    createUserDb,
    deleteUserDb,
    updateUserDb,
    getUserDb,
    clearDb
}
