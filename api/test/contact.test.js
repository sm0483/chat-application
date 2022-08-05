const jContactSchema=require('../jModels/contact');
const Joi=require('joi');
const mongoose=require('mongoose');


const userOne="62d78afd4e5a0f1a955f9f0d";
const userTwo="62d78afd4e5a0f1a955f9f0e";


const testContactOne={
    senderId:userOne,
    reciverId:userTwo,
}


const testContactTwo={
    senderId:userOne
}

const testContactThree={
    reciverId:userTwo
}

const testContactFour={
    senderId:"",
    reciverId:"",
}


describe("Test joi contact model",()=>{
    test("contact/success",async()=>{
        const valid=await jContactSchema.validate(testContactOne);
        expect(valid.value.senderId).toBe(testContactOne.senderId);
        expect(valid.value.reciverId).toBe(testContactOne.reciverId);
        expect(valid.error).toBeUndefined();

    })

    test("reciverId not  present/failure",async()=>{
        const valid=await jContactSchema.validate(testContactTwo);
        expect(valid.error).toBeDefined();
        const reciverIdError=valid.error.message.includes("reciverId");
        expect(reciverIdError).toBeTruthy();

    })


    test(" senderId not present /failure",async()=>{
        const valid=await jContactSchema.validate(testContactThree);
        expect(valid.error).toBeDefined();
        const senderIdError=valid.error.message.includes("senderId");
        expect(senderIdError).toBeTruthy();

    })


    test(" senderId  and reciverId not present /failure",async()=>{
        const valid=await jContactSchema.validate(testContactFour,{abortEarly:false});
        const error=valid.error.message.includes("senderId") && valid.error.message.includes("reciverId");
        expect(error).toBeTruthy();

    })


    


 


})