const jUserSchema=require('../jModels/user');
const Joi=require('joi');


//data
const testUser={username:"sm0483",password:"Test@2001",email:"test@gmail.com"}
const testUserFM={username:"sm0483",password:"Test@2001",email:"test@@gmail.com"}
const testUserFP={username:"sm048",password:"test@2001",email:"test@gmail.com"}
const testUserFN={username:"sm",password:"Test@2001",email:"test@gmail.com"}


describe("Test joi user model",()=>{
    test("user/success",async()=>{
        const valid=await jUserSchema.validate(testUser);
        expect(valid.value.username).toBe(testUser.username);
        expect(valid.value.password).toBe(testUser.password);
        expect(valid.value.email).toBe(testUser.email);
        expect(valid.error).toBeUndefined();

    })

    test("user-email/failure",async()=>{
        const valid=await jUserSchema.validate(testUserFM);
        expect(valid.error).toBeDefined();
        const emailError=valid.error.message.includes("email");
        expect(emailError).toBeTruthy();

    })


    test("user-password/failure",async()=>{
        const valid=await jUserSchema.validate(testUserFP);
        expect(valid.error).toBeDefined();
        const emailError=valid.error.message.includes("password");
        expect(emailError).toBeTruthy();

    })


    test("user-name/failure",async()=>{
        const valid=await jUserSchema.validate(testUserFN);
        expect(valid.error).toBeDefined();
        const emailError=valid.error.message.includes("username");
        expect(emailError).toBeTruthy();

    })


})