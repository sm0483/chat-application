
const loginUser=async(req,res)=>{ //login user
    res.status(200).json({
        "message":"user loged"
    })

}

const registerUser=async(req,res)=>{ // register user
    res.status(200).json({
        "message":"user loged"
    })

}

const deleteUser=async(req,res)=>{  //route to login  user
    res.send('del user');

}


const updateUser=async(req,res)=>{  // route to login user
    res.send('update user');
}

const getUser=async(req,res)=>{  // get all details of user 
    res.send('get use data');

}



module.exports={
    loginUser,
    registerUser,
    deleteUser,
    updateUser,
    getUser
}