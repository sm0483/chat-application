const { 
    createMessageDb,
    deleteMessageDb,
    getAllMessageDb,
    clearDb
}=require('../db/message-operation');

const {connectDb,closeDb}=require('../db/connect');

require('dotenv').config();

const mongoose=require('mongoose');
const { EXPECTATION_FAILED } = require('http-status-codes');

const getObj=(str)=>{ //string ->object
    return mongoose.Types.ObjectId(str);
}



const userOne="62d78afd4e5a0f1a955f9f0d";
const userTwo="62d78afd4e5a0f1a955f9f0e";

const messageIdOne="62d78afd4e5a0f1a955f9f0f";
const messageIdTwo="62k78afd4e5a0f1a955f9f0d";

beforeAll(async()=>{
    const connection=await connectDb(process.env.URL);
    const response=await clearDb();
})

afterAll(async()=>{
    const responce=await closeDb();
})

const testMessage={
    senderId:getObj(userOne),
    contactId:getObj(messageIdOne),
    message:"Hello how are you"
}

const testMessageOne={
    senderId:getObj(userOne),
    contactId:getObj(messageIdOne),
    message:"Hello"
}





describe("Crud operation on message model",()=>{
    test("create message",async()=>{
        const response=await createMessageDb(testMessage);
        expect(response.contactId).toBe(testMessage.contactId);
        expect(response.senderId).toBe(testMessage.senderId);
        expect(response.message).toBe(testMessage.message);
    })

    test("create message second",async()=>{
        const response=await createMessageDb(testMessageOne);
        expect(response.contactId).toBe(testMessageOne.contactId);
        expect(response.senderId).toBe(testMessageOne.senderId);
        expect(response.message).toBe(testMessageOne.message);

    })

    test("get  message data",async()=>{
        const data={
            senderId:testMessage.senderId,
            contactId:testMessage.contactId
        }
        const response=await getAllMessageDb(data);
        expect(JSON.stringify(response[0].contactId)).toBe(JSON.stringify(testMessage.contactId));
        expect(JSON.stringify(response[0].senderId)).toBe(JSON.stringify(testMessage.senderId));
        expect(response.length).toBe(2);

    })

    test("get message with only messageId",async()=>{
        const data={
            contactId:testMessage.contactId
        }
        const response=await getAllMessageDb(data);
        expect(response.length).toBe(0);
    })

    
})


