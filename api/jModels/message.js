const Joi=require('joi');
Joi.objectId = require("joi-objectid")(Joi);


const messageSchema=new Joi.object({
    message:Joi.string().optional(),
    senderId:Joi.objectId().required(),
    contactId:Joi.objectId().required(),
})

module.exports=messageSchema;