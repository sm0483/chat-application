const {connectDb,closeDb}=require('../db/connect');
require('dotenv').config();
const {
    createUserDb,
    updateUserDb,
    deleteUserDb,
    getUserDb,
    clearDb,
    getUserByQuery,
    getUsersDb
}=require('../db/db-operation');


const testUser={
    username:"sm0483",
    email:"test7@gmail.com",
    password:"Test@2001"
}

const editUser={
    username:"sm0483",
    email:"edit@gmail.com",
    password:"Edit@2002"
}

const testUser2={
    username:"sm2003",
    email:"sm0483@gmail.com",
    password:"Sm@048343543"
}

let userId=undefined;
let fakeUserId="8080808080";


beforeAll(async()=>{
    const connection=await connectDb(process.env.URL);
    const deletedData=await clearDb();
})

afterAll(async()=>{
    const responce=await closeDb();
})



describe("Test crud operation on db",()=>{
    test("Test createUser/Sucess",async()=>{
        const responce=await createUserDb(testUser);
        //assign useId
        userId=responce._id;
        expect(responce.username).toBe(testUser.username);
        expect(responce.email).toBe(testUser.email);
    })

    test("Test createUser duplicate/failure",async()=>{
        expect(async()=>{
            await createUserDb(testUser).toThrow(UserExistsError)
        });
    })

    test("Test createUser2/Sucess",async()=>{
        const responce=await createUserDb(testUser2);
        //assign useId
        expect(responce.username).toBe(testUser2.username);
        expect(responce.email).toBe(testUser2.email);
    })

    test("Test find user by query",async()=>{
        const responce=await getUserByQuery({email:testUser.email});
        expect(responce.email).toBe(testUser.email);
        expect(responce.username).toBe(testUser.username);
        expect(responce.password).toBeDefined();
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
    
    test("Test update user in db/sucess",async()=>{
        const responce=await updateUserDb(userId,editUser);
        expect(responce.username).toBe(editUser.username);
        expect(responce._id).toStrictEqual(userId);
    })
    test("Test update user in db/failure",async()=>{
          expect(async()=>{
                await updateUserDb(fakeUserId,editUser).toThrow(CastError);
    
            })
        })

    test("Test get all user in one go",async()=>{
        const responce=await getUsersDb();
        expect(responce[0].email).toBe(testUser.email);
        expect(responce[1].username).toBe(testUser2.username);
    })   
    
    test("Test delete user in db?/Sucess",async()=>{
        const responce=await deleteUserDb(userId);
        expect(editUser.username).toBe(responce.username);
        expect(userId).toStrictEqual(responce._id);
    })

    test("Test delete user in db/failure",async()=>{
        expect(async()=>{
            await deleteUserDb(fakeUserId).toThrow(CastError);
        })
    })

    

 
    
})
    


