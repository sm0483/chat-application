const { 
    createMessageDb,
    deleteMessageDb,
    getMessageByUserid,
    getMessageDbByMessageId,
    clearDb
}=require('../db/message-operation');

const {connectDb,closeDb}=require('../db/connect');

require('dotenv').config();

const {v4 : uuidv4} = require('uuid');
const { deleteUserDb } = require('../db/db-operation');
const { response } = require('express');

const userOne=uuidv4();
const userTwo=uuidv4();
const userThree=uuidv4();
const userFour=uuidv4();


beforeAll(async()=>{
    const connection=await connectDb(process.env.URL);
    const response=await clearDb();
})

afterAll(async()=>{
    const responce=await closeDb();
})

const testMessage={
    senderId:userOne,
    reciverId:userTwo,
    message:"Hello how are you"
}

const testMessage1={
    senderId:userTwo,
    reciverId:userOne,
    message:"hello world"
}

const testMessage2={
    senderId:userTwo,
    reciverId:userThree,
    message:"userTwo->userThree"
}

const testMessage3={
    senderId:userTwo,
    reciverId:userThree,
    message:"userTwo->userThree"
}


const testMessage4={
    senderId:userThree,
    reciverId:userTwo,
    message:"userThree->userTwo"

}

let messageId=undefined;
let messageId1=undefined;

describe("Crud operation on message model",()=>{
    test("create message",async()=>{
        const response=await createMessageDb(testMessage);
        expect(response.senderId).toBe(testMessage.senderId);
        expect(response.reciverId).toBe(testMessage.reciverId);
        expect(response.message).toBe(testMessage.message);
        messageId=response._id;
    })

    test("create document second message",async()=>{
        const response=await createMessageDb(testMessage1);
        expect(response.senderId).toBe(testMessage1.senderId);
        expect(response.reciverId).toBe(testMessage1.reciverId);
        expect(response.message).toBe(testMessage1.message);
        messageId1=response._id;
 
    })

    test("create document third message",async()=>{
        const response=await createMessageDb(testMessage2);
        expect(response.senderId).toBe(testMessage2.senderId);
        expect(response.reciverId).toBe(testMessage2.reciverId);
        expect(response.message).toBe(testMessage2.message);
 
    })

    test("create document fourth message",async()=>{
        const response=await createMessageDb(testMessage3);
        expect(response.senderId).toBe(testMessage3.senderId);
        expect(response.reciverId).toBe(testMessage3.reciverId);
        expect(response.message).toBe(testMessage3.message);
 
    })

    test("create document fifth message",async()=>{
        const response=await createMessageDb(testMessage4);
        expect(response.senderId).toBe(testMessage4.senderId);
        expect(response.reciverId).toBe(testMessage4.reciverId);
        expect(response.message).toBe(testMessage4.message);
 
    })

    test("fetch message data with MessageId",async()=>{
        const response=await getMessageDbByMessageId(messageId1);
        expect(response.senderId).toBe(testMessage1.senderId);
        expect(response.reciverId).toBe(testMessage1.reciverId);
        expect(response.message).toBe(testMessage1.message);
   
    })

    test("fetch message with both userId",async()=>{
        const response=await getMessageByUserid(userTwo,userThree);
        expect(response.length).toBe(3);
        expect(response[0].senderId).toBe(userTwo);
        expect(response[0].reciverId).toBe(userThree);
        expect(response[1].senderId).toBe(userTwo);
        expect(response[1].reciverId).toBe(userThree);
        expect(response[2].senderId).toBe(userThree);
        expect(response[2].reciverId).toBe(userTwo);

    })

    test("delete message ",async()=>{
        const response=await deleteMessageDb(messageId);
        expect(response.senderId).toBe(testMessage.senderId);
        expect(response.reciverId).toBe(testMessage.reciverId);
        expect(response.message).toBe(testMessage.message);

    })

    
})