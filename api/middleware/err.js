const CustomError=require('../error/custom');


const errorHandler=(err,req,res,next)=>{
    console.log("from error handler"+err);
    return res.status(404).json(err);
}

module.exports=errorHandler;