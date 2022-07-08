const localStore=(req,res,next)=>{
    const message=req.flash('success');
    res.locals.success=message;
    res.locals.password=req.flash('password');
    res.locals.userExist=req.flash('userExist');
    next();
}

module.exports=localStore;