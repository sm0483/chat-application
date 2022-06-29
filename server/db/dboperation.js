const userModel=require('../models/user');

const createUserDb=async(data)=>{
    const {email,name,password}=data;
    userModels=new userModel({
        email:email,
        name:name
    });
    console.log(email,name,password);
    userModel.register(userModels,password,function(err,user){
        if(err){
            console.log(err);
        }else{
            //console.log(user);
        }

    })
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
