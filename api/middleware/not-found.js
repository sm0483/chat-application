const {
    StatusCodes,
    getReasonPhrase
}=require('http-status-codes');

const pageNotFound=(req,res,next)=>{
    res.status(StatusCodes.BAD_REQUEST).json({
        "error":getReasonPhrase(StatusCodes.BAD_REQUEST),
        "statusCode":StatusCodes.BAD_REQUEST
    })
}

module.exports=pageNotFound;