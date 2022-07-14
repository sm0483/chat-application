const Joi=require('joi');
const stRegex=new RegExp('((?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{6,}))|((?=.*[a-z])(?=.*[A-Z])(?=.*[^A-Za-z0-9])(?=.{8,}))');
const emailPattern=new RegExp(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);


const userSchema=new Joi.object({
    username:Joi.string()
    .alphanum()
    .min(4)
    .required(),
    email:Joi.string().regex(emailPattern).required(),
    password:Joi.string().regex(stRegex).required()

})

module.exports=userSchema;