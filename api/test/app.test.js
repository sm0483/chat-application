const request=require('supertest');
const app=require('../test/test-server');
const {clearDb}=require('../db/db-operation');
const {closeDb}=require('../db/connect');
//->Test auth routes
//>post register
//>post login

const testUser={
    username:"sm0483",
    email:"test7@gmail.com",
    password:"Test@2001"
}

beforeAll(async()=>{
    const re=await clearDb();
})

afterAll(async()=>{
    const re=await closeDb();
})

describe("Test auth routes",()=>{
    test("Post register route/success",async()=>{
        const responce=await request(app).post('/api/v1/auth/register')
        .set('Content-type','application/json')
        .send(testUser);
        expect(responce.statusCode).toBe(200);
        expect(responce.type).toBe('application/json');
        expect(responce._body.username).toBe(testUser.username);
        expect(responce._body.email).toBe(testUser.email);

        

    })
})
