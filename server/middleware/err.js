const CustomError=require('../error/custom');


const errorHandler=(err,req,res,next)=>{
    console.log(`from error handler ${err}`);
    if(err instanceof CustomError   ){
        const {message,status}=err;
        if(message.includes('password')){
            res.redirect('/chatapp/auth/register');
        }
        else{
            res.status(500).json({
                "message":message,
                "status":status
            })
    }
    }
    else{
        res.status(500).json({
            "message":"unknow error",
            "status":500
        })
    }

}

module.exports=errorHandler;