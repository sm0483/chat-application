const asyncWrapper=require('../error/asyncWrapper');



const loginUser=asyncWrapper(async(req,res)=>{ //login user
    res.status(200).json({
        "message":"user loged"
    })

})

const registerUser=asyncWrapper(async(req,res)=>{ // register user
    res.status(200).json({
        "message":"user loged"
    })

})

const deleteUser=asyncWrapper(async(req,res)=>{  //route to login  user
    res.send('del user');

})


const updateUser=asyncWrapper(async(req,res)=>{  // route to login user
    res.send('update user');
})

const getUser=asyncWrapper(async(req,res)=>{  // get all details of user 
    res.send('get use data');
})



module.exports={
    loginUser,
    registerUser,
    deleteUser,
    updateUser,
    getUser
}