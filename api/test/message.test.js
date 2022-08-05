const jMessageSchema=require('../jModels/message');
const Joi=require('joi');
const mongoose=require('mongoose');


const userOne="62d78afd4e5a0f1a955f9f0d";
const contactOne="62d78afd4e5a0f1a955f9f0e";


const testMessageOne={
    senderId:userOne,
    contactId:contactOne,
    message:"hello world"
}



const testMessageTwo={
    senderId:userOne
}

const testMessageThree={
    contactId:contactOne
}

const testMessageFour={
    senderId:"",
    contactId:"",
    message:""
}

const testMessageFive={
    senderId:userOne,
    contactId:contactOne,
    message:""
}




describe("Test joi message model",()=>{
    test("message/success",async()=>{
        const valid=await jMessageSchema.validate(testMessageOne);
        expect(valid.value.senderId).toBe(testMessageOne.senderId);
        expect(valid.value.reciverId).toBe(testMessageOne.reciverId);
        expect(valid.error).toBeUndefined();

    })

    test("contactId not  present/failure",async()=>{
        const valid=await jMessageSchema.validate(testMessageTwo);
        expect(valid.error).toBeDefined();
        const reciverIdError=valid.error.message.includes("contactId");
        expect(reciverIdError).toBeTruthy();

    })


    test(" senderId not present /failure",async()=>{
        const valid=await jMessageSchema.validate(testMessageThree);
        expect(valid.error).toBeDefined();
        const senderIdError=valid.error.message.includes("senderId");
        expect(senderIdError).toBeTruthy();

    })


    test(" senderId  and reciverId not present /failure",async()=>{
        const valid=await jMessageSchema.validate(testMessageFour,{abortEarly:false});
        const error=valid.error.message.includes("senderId") && valid.error.message.includes("contactId")  && valid.error.message.includes("message");
        expect(error).toBeTruthy();

        //issue message can't be empty

    })



    test(" message not present /failure",async()=>{
        const valid=await jMessageSchema.validate(testMessageFive,{abortEarly:false});
        const error=valid.error.message.includes("message");
        expect(error).toBeTruthy();

    })






})
