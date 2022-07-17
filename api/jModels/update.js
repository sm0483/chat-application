const Joi=require('joi');

const updateSchema=new Joi.object({
    username:Joi.string()
    .alphanum()
    .min(4)
    .required(),
})

module.exports=updateSchema;