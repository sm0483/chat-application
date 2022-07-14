const request=require('supertest');
const server=require('../test/test-server');
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
    const serverResponce=await server.close();
})

describe("Test auth routes",()=>{
    test("Post register route/success",async()=>{
        const responce=await request(server).post('/api/v1/auth/register')
        .set('Content-type','application/json')
        .send(testUser);
        expect(responce.statusCode).toBe(200);
        expect(responce.type).toBe('application/json');
        expect(responce._body.token).toBeDefined();
        expect(responce._body.status).toBe(200);
    })

})
