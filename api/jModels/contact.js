const Joi=require('joi');
Joi.objectId = require("joi-objectid")(Joi);


const contactSchema=new Joi.object({
    senderId:Joi.objectId().required(),
    reciverId:Joi.objectId().required()
})

module.exports=contactSchema;