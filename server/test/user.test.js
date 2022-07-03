const { response } = require('express');
const connectDb=require('../db/connect');
require('dotenv').config();
const {
    createUserDb,
    updateUserDb,
    deleteUserDb,
    getUserDb,
    clearDb
}=require('../db/dboperation');


const testUser={
    username:"test@gmail.com",
    password:"Test@2001"
}

const editUser={
    username:"edit@gmail.com",
    password:"Edit@2002"
}

let userId=undefined;
let fakeUserId="8080808080";


beforeAll(async()=>{
    const connection=await connectDb(process.env.URL);
    const deletedData=await clearDb();
})


describe("Test crud operation on db",()=>{
    test("Test createUser/Sucess",async()=>{
        const responce=await createUserDb(testUser);
        //assign useId
        userId=responce._id;
        expect(responce.username).toBe(testUser.username);
        expect(responce.salt).toBeDefined();
        expect(responce.hash).toBeDefined();
    })

    test("Test createUser duplicate/failure",async()=>{
        expect(async()=>{
            await createUserDb(testUser).toThrow(UserExistsError)
        });
    })

    test("Test find operation in db/success",async()=>{
        const responce=await getUserDb(userId);
        expect(responce.username).toBe(testUser.username);
    })

    test("Test find operation in db/failure",async()=>{
        expect(async()=>{
            await getUserDb(fakeUserId).toThrow(CastError);
        });
    })
    
    test("Update user in db/sucess",async()=>{
        const responce=await updateUserDb(userId,editUser);
        expect(responce.username).toBe(editUser.username);
        expect(responce._id).toStrictEqual(userId);
    })

    test("update user in db/failure",async()=>{
        expect(async()=>{
            await updateUserDb(fakeUserId,editUser).toThrow(CastError);

        });
    })
})