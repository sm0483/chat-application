const request=require('supertest');
const app=require('../test/test-server');
require('dotenv').config();
const handlers=require('../db/dboperation');
const { resolve } = require('path');

const port=process.env.PORT || 5000;


//-->test route /sucess /failure
//-->----------/-------/--------

//->serverLogin /login.ejs / 
//->serverRegister / register.ejs /
//->createUser / redirect('/chatapp/auth/login'); /
//->logout / redirect('/chatapp/auth/login'); /  





beforeAll(async()=>{
 const test=await app.listen(port)
})

const testUser={
    username:"test@gmail.com",
    password:"Test@2001"
}



describe("Test authentication routes",()=>{
    test("Get/Login Page",async()=>{
        const responce=await request(app).get('/test/chatapp/auth/login');
        expect(responce.header['content-type']).toBe('text/html; charset=utf-8');
        expect(responce.statusCode).toBe(200);
    })

    test("Get/Page not Found Route",async()=>{
        const responce=await request(app).get('/test/chatapp/080');
        expect(responce.header['content-type']).toBe('text/html; charset=utf-8');
        expect(responce.statusCode).toBe(404);
    })

    test("Get/Register Page",async()=>{
        const responce=await request(app).get('/test/chatapp/auth/register');
        expect(responce.header['content-type']).toBe('text/html; charset=utf-8');
        expect(responce.statusCode).toBe(200);
    })

    test("Post/Register Page",async()=>{
        const mockCreateUserDb=jest.spyOn(handlers,'createUserDb');
        mockCreateUserDb.createUserDb=async()=>{
            return new Promise((resolve)=>{
                resolve({username:"test@gmail.com"});
            });
        }
        const responce=await request(app).post('/test/chatapp/auth/register')
        .set('Content-type','application/json')
        .send(testUser)
        console.log(responce);

       
    })


})



// jest.spyOn(weatherAPI, 'getWeather')
// weatherAPI.getWeather.mockImplementation((format) => `20`)

// const result = messageWeather();
// const expected = `Today weather is 20, have a nice day!`;

// expect(weatherAPI.getWeather).toHaveBeenCalledWith('C');
// expect(result).toBe(expected);

// weatherAPI.getWeather.mockRestore();

// const getMetaWeather = async () => {
//     return new Promise((resolve) => {
//         resolve('Summer time!')
//     })

// }
