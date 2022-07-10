const pageNotFound=(req,res,next)=>{
    res.status(404).render('not-found');
}

module.exports=pageNotFound;