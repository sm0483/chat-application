const { 
    createContactDb,
    deleteContactDb,
    getAllMessageIdDb,
    getMessageIdDb,
    clearDb
}=require('../db/contact-operation');
const mongoose=require('mongoose');

const getObj=(str)=>{ //string ->object
    return mongoose.Types.ObjectId(str);
}


const {connectDb,closeDb}=require('../db/connect');

require('dotenv').config();



const userOne="62d78afd4e5a0f1a955f9f0d";
const userTwo="62d78afd4e5a0f1a955f9f0e";
const userThree="62d78afd4e5a0f1a955f9f0f";
const userFour="62k78afd4e5a0f1a955f9f0d";


beforeAll(async()=>{
    const connection=await connectDb(process.env.URL);
    const response=await clearDb();
})

afterAll(async()=>{
    const responce=await closeDb();
})

const testContact1={
    senderId:getObj(userOne),
    reciverId:getObj(userTwo),
}

const testContact2={
    senderId:getObj(userTwo),
    reciverId:getObj(userOne),
}

const testContact3={
    senderId:getObj(userTwo),
    reciverId:getObj(userThree),
}

const testContact4={
    senderId:getObj(userTwo),
    reciverId:getObj(userThree),
}

describe("Test on contactModel ",()=>{
    test("create new contact/success",async()=>{
        const response=await createContactDb(testContact1);
        expect(response.id1).toBe(testContact1.senderId);
        expect(response.id2).toBe(testContact1.reciverId);
    })

    test("create new contact/success",async()=>{
        const response=await createContactDb(testContact3);
        expect(response.id1).toBe(testContact3.senderId);
        expect(response.id2).toBe(testContact3.reciverId);
    })

 
    test("create new contact/duplicate-error",async()=>{
        expect(async()=>{
            await createContactDb(testContact2).toThrow(MongoServerError);

        })
    })

    test("create new contact/duplicate-error",async()=>{
        expect(async()=>{
            await createContactDb(testContact4).toThrow(MongoServerError);

        })
    })

    test("get all message using messageId",async()=>{
        const response=await getAllMessageIdDb(testContact1);
        expect(JSON.stringify(response[0].id1)).toBe(JSON.stringify(testContact1.senderId));
        expect(JSON.stringify(response[0].id2)).toBe(JSON.stringify(testContact1.reciverId));


    })

    test("get message by using senderId and reciverId",async()=>{
        const response=await getMessageIdDb(testContact3);
        expect(JSON.stringify(response[0].id1)).toBe(JSON.stringify(testContact3.senderId));
        expect(JSON.stringify(response[0].id2)).toBe(JSON.stringify(testContact3.reciverId))

    })


})

