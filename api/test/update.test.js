const updateUser=require('../jModels/update');
const Joi=require('joi');

const testUser={username:"sm0483"}
const testUserFM={username:""}


describe("Test joi user model",()=>{
    test("update/success",async()=>{
        const valid=await updateUser.validate(testUser);
        expect(valid.value.username).toBe(testUser.username);
        expect(valid.error).toBeUndefined();
    })

    test("update/failure",async()=>{
        const valid=await updateUser.validate(testUserFM);
        expect(valid.error).toBeDefined();
        const emailError=valid.error.message.includes("username");
        expect(emailError).toBeTruthy();

    })


})