const Joi=require('joi');
const emailPattern=new RegExp(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);


const userSchema=new Joi.object({
    email:Joi.string().regex(emailPattern).required(),
    password:Joi.string().required()
})

module.exports=userSchema;