const asyncWrapper=require('../error/asyncWrapper');
const {createUserDb}=require('../db/db-operation');
const CustomError = require('../error/custom');


const {
    StatusCodes,
    getReasonPhrase
}=require('http-status-codes');



//routes
//----------------
//>login routes
//>register routes
//>authorzation to delete accoun and update accoun


const login=asyncWrapper(async(req,res)=>{
    const user=req.userDb;
    const token=user.createJwt();
    res.status(StatusCodes.OK).json({
        "userId":user._id,
        "token":token,
        "status":StatusCodes.OK
    })
})


const registerUser=asyncWrapper(async(req,res)=>{
    const newUser=await createUserDb(req.body);
    const token=newUser.createJwt();
    res.status(StatusCodes.OK).json({
        "userId":newUser._id,
        "token":token,
        "status":StatusCodes.OK
    })
})

const updateToken=asyncWrapper(async(req,res)=>{
    const user=req.userDb;
    const token=await user.createSuperToken('update-delete');
    res.status(StatusCodes.OK).json({
        "userId":user._id,
        "Supertoken":token,
        "status":StatusCodes.OK
    })

})


module.exports={
    login,
    registerUser,
    updateToken
}