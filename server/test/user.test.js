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
    username:"test8@gmail.com",
    password:"Test@2001"
}


beforeAll(async()=>{
    const connection=await connectDb(process.env.URL);
    const deletedData=await clearDb();
    console.log(deletedData);
})


describe("Test crud operation on db",()=>{
    test("Test createUser/Sucess",async()=>{
        const responce=await createUserDb(testUser);
        expect(responce.username).toBe(testUser.username);
        expect(responce.salt).toBeDefined();
        expect(responce.hash).toBeDefined();
    })

    test("Test createUser duplicate/failure",async()=>{
        expect(async()=>{
            await createUserDb(testUser).toThrow(UserExistsError)
        });
    })
    
    test("Update user /sucess",async()=>{
        const responce=updateUserDb();
    })
})