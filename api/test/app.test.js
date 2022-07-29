const request=require('supertest');
const server=require('../test/test-server');
const {clearDb}=require('../db/db-operation');
const {closeDb}=require('../db/connect');
const{clearDb:clearContact}=require('../db/contact-operation');

const {
getReasonPhrase,StatusCodes
}=require('http-status-codes');

const mongoose=require('mongoose');

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

const testUser2={
    "username":"sm0483",
    "password":"Test@2001",
    "email":"sm048314@gmail.com"
}


const testUser3={
    "username":"sm3456",
    "password":"srg@2001",
    "email":"sm@gmail.com"
}

let testToken=undefined;
let superToken=undefined;
let secondToken=undefined;

const editedUser={
    "username":"sm2004"
}


beforeAll(async()=>{
    const re=await clearDb();
    await clearContact();
})

afterAll(async()=>{
    const response=await clearDb();
    await clearContact();
    const re=await closeDb();
    const serverresponse=await server.close();
})

describe("Test auth routes",()=>{

    test("/Post test random route route/radom-route",async()=>{
        const response=await request(server).post('/api/v1/auth/authorize/797')
        .set('Content-type','application/json')
        .send()
        expect(response.statusCode).toBe(StatusCodes.NOT_FOUND)
    })



    test("/Post register route/success",async()=>{
        const response=await request(server).post('/api/v1/auth/register')
        .set('Content-type','application/json')
        .send(testUserRegister);
        expect(response.statusCode).toBe(StatusCodes.OK);
        expect(response.type).toBe('application/json');
        expect(response._body.userId).toBeDefined();
        expect(response._body.token).toBeDefined();
        expect(response._body.status).toBe(StatusCodes.OK);
    })

    test("/Post register second user route/success",async()=>{
        const response=await request(server).post('/api/v1/auth/register')
        .set('Content-type','application/json')
        .send(testUser2);
        expect(response.statusCode).toBe(StatusCodes.OK);
        expect(response.type).toBe('application/json');
        expect(response._body.userId).toBeDefined();
        expect(response._body.token).toBeDefined();
        expect(response._body.status).toBe(StatusCodes.OK);
        secondToken=response._body.token;
    })

    test("/Post register route/cred-not-valid",async()=>{
        const response=await request(server).post('/api/v1/auth/register')
        .set('Content-type','application/json')
        .send(editedUser);
        expect(response.statusCode).toBe(StatusCodes.UNPROCESSABLE_ENTITY);
        expect(response.type).toBe('application/json');
        
    })

    test("/Post login route/success",async()=>{
        const response=await request(server).post('/api/v1/auth/login')
        .set('Content-type','application/json')
        .send(testUserLogin);
        expect(response.statusCode).toBe(StatusCodes.OK);
        expect(response.type).toBe('application/json');
        expect(response._body.userId).toBeDefined();
        expect(response._body.token).toBeDefined();
        expect(response._body.status).toBe(StatusCodes.OK);

        //asign token
        testToken=response._body.token;

    })

    test("/Post updateToken route/success",async()=>{
        const response=await request(server).post('/api/v1/auth/authorize')
        .set('Content-type','application/json')
        .set('Authorization',`Bearer ${testToken}`)
        .send(testUserPassword)
        expect(response._body.Supertoken).toBeDefined();
        expect(response._body.userId).toBeDefined();
        expect(response._body.status).toBe(StatusCodes.OK);
        superToken=response._body.Supertoken;
    })


    test("/Post updateToken route/token-ribbed",async()=>{
        const response=await request(server).post('/api/v1/auth/authorize')
        .set('Content-type','application/json')
        .set('Authorization',`Bearer ${testToken.replace('a','x')}`)
        .send(testUserPassword)
        expect(response._body.Supertoken).toBeUndefined();
        expect(response.statusCode).toBe(StatusCodes.UNAUTHORIZED)
    })


    test("/Get  user data route/sucess",async()=>{
        const response=await request(server).get('/api/v1/user')
        .set('Content-type','application/json')
        .set('Authorization',`Bearer ${testToken}`)
        .send()

        expect(response.statusCode).toBe(StatusCodes.OK);
        expect(response._body.username).toBe(testUserRegister.username);
        expect(response._body.email).toBe(testUserRegister.email)

    })



    test("/Post update user route/sucess",async()=>{
        const response=await request(server).patch('/api/v1/user')
        .set('Content-type','application/json')
        .set('Authorization',`Bearer ${superToken}`)
        .send(editedUser)

        expect(response.statusCode).toBe(StatusCodes.OK);
        expect(response._body.username).toBe(editedUser.username);
        expect(response._body.email).toBe(testUserRegister.email)

    })

    test("/Post update user route/sucess",async()=>{
        const response=await request(server).patch('/api/v1/user')
        .set('Content-type','application/json')
        .set('Authorization',`Bearer ${superToken.replace('b','y')}`)
        .send(editedUser)

        expect(response.statusCode).toBe(StatusCodes.UNAUTHORIZED);
      

    })


    test("/Delete  user route/sucess",async()=>{
        const response=await request(server).delete('/api/v1/user')
        .set('Content-type','application/json')
        .set('Authorization',`Bearer ${superToken}`)
        .send()

        expect(response.statusCode).toBe(StatusCodes.OK);
        expect(response._body.username).toBe(editedUser.username);
        expect(response._body.email).toBe(testUserRegister.email);

    })

    test("/Delete  user route/token-ribbed",async()=>{
        const response=await request(server).delete('/api/v1/user')
        .set('Content-type','application/json')
        .set('Authorization',`Bearer ${superToken.replace('a','x')}`)
        .send()

        expect(response.statusCode).toBe(StatusCodes.UNAUTHORIZED);


    })

    test("Get all users route/success",async()=>{
        const response=await request(server).get('/api/v1/app')
        .set('Authorization',`Bearer ${secondToken}`)
        .send();
        expect(response._body.message[0].username).toBe(testUser2.username);
        expect(response._body.message[0].email).toBe(testUser2.email);
        expect(response._body.message[0].userId).toBeDefined();
    })


})



const userOne="62d78afd4e5a0f1a955f9f0d";
const userTwo="62d78afd4e5a0f1a955f9f0e";
const userThree="62d78afd4e5a0f1a955f9f0f";
const userFour="62k78afd4e5a0f1a955f9f0d";

const getObj=(str)=>{ //string ->object
    return mongoose.Types.ObjectId(str);
}

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

const testContactMain={
    senderId:"",
    reciverId:getObj(userThree)
}

const testContactMainDuplcate={
    senderId:getObj(userThree),
    reciverId:""
}

let thirdToken=undefined;
describe('Test all contact route',()=>{

    test("/Post register route/success",async()=>{
        const response=await request(server).post('/api/v1/auth/register')
        .set('Content-type','application/json')
        .send(testUserRegister);
        expect(response.statusCode).toBe(StatusCodes.OK);
        expect(response.type).toBe('application/json');
        expect(response._body.token).toBeDefined();
        expect(response._body.status).toBe(StatusCodes.OK);
        thirdToken=response._body.token;
        testContactMain.senderId=response._body.userId;
        testContactMainDuplcate.reciverId=response._body.userId
    })



    test('/Post create contact route/success',async()=>{
        const response=await request(server).post('/api/v1/contact')
        .set('Content-type','application/json')
        .set('Authorization',`Bearer ${thirdToken}`)
        .send(testContactMain);
        expect(response.type).toBe('application/json');
        expect(JSON.stringify(response._body.id1)).toBe(JSON.stringify(testContactMain.senderId));
        expect(JSON.stringify(response._body.id2)).toBe(JSON.stringify(testContactMain.reciverId));

    })

    test('/Post create contact duplcate route/success',async()=>{
        expect(async()=>{
            const response=await request(server).post('/api/v1/contact')
            .set('Content-type','application/json')
            .set('Authorization',`Bearer ${thirdToken}`)
            .send(testContactMainDuplcate);
            response.toThrow()
        })

    })

    test('/Post create random contact with token',async()=>{
        const response=await request(server).post('/api/v1/contact')
        .set('Content-type','application/json')
        .set('Authorization',`Bearer ${thirdToken}`)
        .send(testContactMainDuplcate);
        expect(response._body.error).toBeDefined();
    })

    // test('/Get all contact by senderId route/success',async()=>{
    //     const response=await request(server).get(`/api/v1/contact/find/${userOne}`)
    //     .set('Content-type','application/json')
    //     .set('Authorization',`Bearer ${thirdToken}`)
    //     .send();

    //     // console.log(response._body);

    //     expect(response._body.message).toBeDefined();
    //     expect(response._body.message[0].id1).toBeDefined();





    // })



})
