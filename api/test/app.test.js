const request=require('supertest');
const server=require('../test/test-server');
const {clearDb}=require('../db/db-operation');
const {closeDb}=require('../db/connect');
const {
getReasonPhrase,StatusCodes
}=require('http-status-codes');

//->Test auth routes
//>post register
//>post login

const testUserRegister={
    username:"sm0483",
    email:"test7@gmail.com",
    password:"Test@2001"
}

const testUserLogin={
    email:"test7@gmail.com",
    password:"Test@2001"
}

const testUserPassword={
    password:"Test@2001"
}

let testToken=undefined;
let superToken=undefined

const editedUser={
    "username":"sm2004"
}


beforeAll(async()=>{
    const re=await clearDb();
})

afterAll(async()=>{
    const responce=await clearDb();
    const re=await closeDb();
    const serverResponce=await server.close();
})

describe("Test auth routes",()=>{

    test("/Post test random route route/radom-route",async()=>{
        const responce=await request(server).post('/api/v1/auth/authorize/797')
        .set('Content-type','application/json')
        .send()
        expect(responce.statusCode).toBe(StatusCodes.NOT_FOUND)
    })



    test("/Post register route/success",async()=>{
        const responce=await request(server).post('/api/v1/auth/register')
        .set('Content-type','application/json')
        .send(testUserRegister);
        expect(responce.statusCode).toBe(StatusCodes.OK);
        expect(responce.type).toBe('application/json');
        expect(responce._body.token).toBeDefined();
        expect(responce._body.status).toBe(StatusCodes.OK);
    })

    test("/Post register route/cred-not-valid",async()=>{
        const responce=await request(server).post('/api/v1/auth/register')
        .set('Content-type','application/json')
        .send(editedUser);
        expect(responce.statusCode).toBe(StatusCodes.UNPROCESSABLE_ENTITY);
        expect(responce.type).toBe('application/json');
      
    })

    test("/Post login route/success",async()=>{
        const responce=await request(server).post('/api/v1/auth/login')
        .set('Content-type','application/json')
        .send(testUserLogin);
        expect(responce.statusCode).toBe(StatusCodes.OK);
        expect(responce.type).toBe('application/json');
        expect(responce._body.token).toBeDefined();
        expect(responce._body.status).toBe(StatusCodes.OK);

        //asign token
        testToken=responce._body.token;

    })

    test("/Post updateToken route/success",async()=>{
        const responce=await request(server).post('/api/v1/auth/authorize')
        .set('Content-type','application/json')
        .set('Authorization',`Bearer ${testToken}`)
        .send(testUserPassword)
        expect(responce._body.Supertoken).toBeDefined();
        expect(responce._body.status).toBe(StatusCodes.OK);
        superToken=responce._body.Supertoken;
    })


    test("/Post updateToken route/token-ribbed",async()=>{
        const responce=await request(server).post('/api/v1/auth/authorize')
        .set('Content-type','application/json')
        .set('Authorization',`Bearer ${testToken.replace('a','x')}`)
        .send(testUserPassword)
        expect(responce._body.Supertoken).toBeUndefined();
        expect(responce.statusCode).toBe(StatusCodes.UNAUTHORIZED)
    })


    test("/Get  user data route/sucess",async()=>{
        const responce=await request(server).get('/api/v1/user')
        .set('Content-type','application/json')
        .set('Authorization',`Bearer ${testToken}`)
        .send()

        expect(responce.statusCode).toBe(StatusCodes.OK);
        expect(responce._body.username).toBe(testUserRegister.username);
        expect(responce._body.email).toBe(testUserRegister.email)

    })



    test("/Post update user route/sucess",async()=>{
        const responce=await request(server).patch('/api/v1/user')
        .set('Content-type','application/json')
        .set('Authorization',`Bearer ${superToken}`)
        .send(editedUser)

        expect(responce.statusCode).toBe(StatusCodes.OK);
        expect(responce._body.username).toBe(editedUser.username);
        expect(responce._body.email).toBe(testUserRegister.email)

    })

    test("/Post update user route/sucess",async()=>{
        const responce=await request(server).patch('/api/v1/user')
        .set('Content-type','application/json')
        .set('Authorization',`Bearer ${superToken.replace('b','y')}`)
        .send(editedUser)

        expect(responce.statusCode).toBe(StatusCodes.UNAUTHORIZED);
      

    })


    test("/Delete  user route/sucess",async()=>{
        const responce=await request(server).delete('/api/v1/user')
        .set('Content-type','application/json')
        .set('Authorization',`Bearer ${superToken}`)
        .send()

        expect(responce.statusCode).toBe(StatusCodes.OK);
        expect(responce._body.username).toBe(editedUser.username);
        expect(responce._body.email).toBe(testUserRegister.email);

    })

    test("/Delete  user route/token-ribbed",async()=>{
        const responce=await request(server).delete('/api/v1/user')
        .set('Content-type','application/json')
        .set('Authorization',`Bearer ${superToken.replace('a','x')}`)
        .send()

        expect(responce.statusCode).toBe(StatusCodes.UNAUTHORIZED);


    })






    

})