const request=require('supertest');
const server=require('../test/test-server');
const {clearDb}=require('../db/db-operation');
const {closeDb}=require('../db/connect');
const{clearDb:clearContact}=require('../db/contact-operation');
const {clearDb:clearMessage}=require('../db/message-operation');

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
    await clearMessage();
})

afterAll(async()=>{
    const response=await clearDb();
    await clearContact();
    await clearMessage();
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
    // return mongoose.Types.ObjectId(str);
    return str;
}

const testContact1={
    senderId:getObj(userOne),
    reciverId:getObj(userTwo),
}


const testContactMain={
    senderId:"",
    reciverId:getObj(userThree)
}

const testContactMainDuplcate={
    senderId:getObj(userThree),
    reciverId:""
}

const testContactMain1={
    senderId:"",
    reciverId:getObj(userTwo),
}

testContactFieldOne={
    senderId:"",
    reciverId:""
}

testContactFieldTwo={
    senderId:"",
    reciverId:getObj(userTwo)
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
        testContactMainDuplcate.reciverId=response._body.userId;
        testContactMain1.senderId=response._body.userId;
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


    test('/Post create contact, senderId and reciverId not  present route/success',async()=>{
        const response=await request(server).post('/api/v1/contact')
        .set('Content-type','application/json')
        .set('Authorization',`Bearer ${thirdToken}`)
        .send(testContactFieldOne);
        expect(response.type).toBe('application/json');
        expect(response._body.error).toBeDefined();

    })


    test('/Post create contact, senderId or reciverId  not  present route/success',async()=>{
        const response=await request(server).post('/api/v1/contact')
        .set('Content-type','application/json')
        .set('Authorization',`Bearer ${thirdToken}`)
        .send(testContactFieldTwo);
        expect(response.type).toBe('application/json');
        expect(response._body.error).toBeDefined();

    })



    test('/Post create contact 2 route/success',async()=>{
        const response=await request(server).post('/api/v1/contact')
        .set('Content-type','application/json')
        .set('Authorization',`Bearer ${thirdToken}`)
        .send(testContactMain1);
        expect(response.type).toBe('application/json');
        expect(JSON.stringify(response._body.id1)).toBe(JSON.stringify(testContactMain1.senderId));
        expect(JSON.stringify(response._body.id2)).toBe(JSON.stringify(testContactMain1.reciverId));

    })

    test('/Post create contact duplcate route/failure',async()=>{
        const response=await request(server).post('/api/v1/contact')
        .set('Content-type','application/json')
        .set('Authorization',`Bearer ${thirdToken}`)
        .send(testContact1);
        expect(response._body.error).toBeDefined();

    })

    test('/Post create random contact with token',async()=>{
        const response=await request(server).post('/api/v1/contact')
        .set('Content-type','application/json')
        .set('Authorization',`Bearer ${thirdToken}`)
        .send(testContactMainDuplcate);
        expect(response._body.error).toBeDefined();
    })

    test('/Get all contact by senderId route/success',async()=>{
        const response=await request(server).get(`/api/v1/contact/find/${testContactMain.senderId}`)
        .set('Content-type','application/json')
        .set('Authorization',`Bearer ${thirdToken}`)
        .send();
        expect(response.statusCode).toBe(StatusCodes.OK);
        expect(response._body.message).toBeDefined();
        expect(response._body.message[0].id1).toBe(testContactMain.senderId);

    })

    test('/Get all contact by senderId route/failure due senderId not valid',async()=>{
        const response=await request(server).get("/api/v1/contact/find/0808080808080")
        .set('Content-type','application/json')
        .set('Authorization',`Bearer ${thirdToken}`)
        .send();
        expect(response.statusCode).toBe(StatusCodes.UNAUTHORIZED);
        expect(response._body.error).toBeDefined();

    })


    test('/Get all contact by senderId and reciverId route/success',async()=>{
        const response=await request(server).get(`/api/v1/contact/find/${testContactMain.senderId}/${testContactMain.reciverId}`)
        .set('Content-type','application/json')
        .set('Authorization',`Bearer ${thirdToken}`)
        .send();
        expect(response.statusCode).toBe(StatusCodes.OK);
        expect(response._body.message.length).toBe(1);
    })


})

const messageIdOne="62d78afd4e5a0f1a955f9f0f";
const messageIdTwo="62k78afd4e5a0f1a955f9f0d";
let user=undefined;

const testMessage={
    senderId:getObj(userOne),
    contactId:getObj(messageIdOne),
    message:"Hello how are you"
}

const testMessageOne={
    senderId:getObj(userOne),
    contactId:getObj(messageIdOne),
    message:"Hello"
}

const testMessageTwo={
    senderId:"",
    contactId:getObj(messageIdOne),
    message:"what the funck"
}


const testUserRegisterTwo={
    username:"sm0483",
    email:"test10@gmail.com",
    password:"Test@2001"
}






let messageUserToken=undefined;

let contactId=undefined;


describe("Test all Message route",()=>{

    test("/Post register route/success",async()=>{
        const response=await request(server).post('/api/v1/auth/register')
        .set('Content-type','application/json')
        .send(testUserRegisterTwo);
        expect(response.statusCode).toBe(StatusCodes.OK);
        expect(response.type).toBe('application/json');
        expect(response._body.userId).toBeDefined();
        expect(response._body.token).toBeDefined();
        expect(response._body.status).toBe(StatusCodes.OK);
        messageUserToken=response._body.token;
        testMessageTwo.senderId=getObj(response._body.userId);
    })


    test("/Post update user token not present route/sucess",async()=>{
        const response=await request(server).post('/api/v1/message')
        .set('Content-type','application/json')
        // .set('Authorization',`Bearer ${messageUserToken}`)
        .send(testMessage)
        expect(response._body.error).toBeDefined();
    })


    test("/Post update user token and senderId don't match route/failure",async()=>{
        const response=await request(server).post('/api/v1/message')
        .set('Content-type','application/json')
        .set('Authorization',`Bearer ${messageUserToken}`)
        .send(testMessage)
        expect(response._body.error).toBeDefined();

    })


    test("/Post update user token and senderId match route/sucess",async()=>{
        const response=await request(server).post('/api/v1/message')
        .set('Content-type','application/json')
        .set('Authorization',`Bearer ${messageUserToken}`)
        .send(testMessageTwo)
        expect(response._body.message).toBeDefined();
        expect(JSON.stringify(response._body.message.contactId)).toBe(JSON.stringify(testMessageTwo.contactId));
        expect(JSON.stringify(response._body.message.senderId)).toBe(JSON.stringify(testMessageTwo.senderId));
    })


})





// for other test

const testUserRegisterThree={
    username:"sm3434",
    email:"test4@gmail.com",
    password:"Test@2001"
}

let tokenThree=undefined;
let userIdThree=undefined;


const testUserRegisterFour={
    username:"sm5454",
    email:"test45@gmail.com",
    password:"Test@2001"
}

let tokenFour=undefined;
let userIdFour=undefined;

const contactOne="62d78afd4e5a0f1a955f9f0e";





const testMessageLast={  //three->four // fourt->three
    senderId:"",
    contactId:"",
    message:"ok da"
}



const testContactLast={
    senderId:"",
    reciverId:"",
}

const testMessageFieldOne={
    senderId:"",
    contactId:contactOne,
    message:"hello world"
}

const testMessageFieldTwo={
    senderId:contactOne,
    contactId:contactOne,
    message:"",
}


let contactIdLast=undefined;

describe("Extensive test on message get route",()=>{

    //register two user
    //store token

    //store senderId
    //create message type

    //create contact with each other
    //send message->{
        // three->four
        // four->three


    //}



    test("/Post register-1 route/success",async()=>{
        const response=await request(server).post('/api/v1/auth/register')
        .set('Content-type','application/json')
        .send(testUserRegisterFour);
        expect(response.statusCode).toBe(StatusCodes.OK);
        expect(response.type).toBe('application/json');
        expect(response._body.userId).toBeDefined();
        expect(response._body.token).toBeDefined();
        expect(response._body.status).toBe(StatusCodes.OK);
        tokenFour=response._body.token;
        userIdFour=response._body.userId;
    })


    test("/Post register-2 route/success",async()=>{
        const response=await request(server).post('/api/v1/auth/register')
        .set('Content-type','application/json')
        .send(testUserRegisterThree);
        expect(response.statusCode).toBe(StatusCodes.OK);
        expect(response.type).toBe('application/json');
        expect(response._body.userId).toBeDefined();
        expect(response._body.token).toBeDefined();
        expect(response._body.status).toBe(StatusCodes.OK);
        tokenThree=response._body.token;
        userIdThree=response._body.userId;
    })


    //create contact

    test('/Post create contact {3->4} route/success',async()=>{
        testContactLast.senderId=getObj(userIdThree);
        testContactLast.reciverId=getObj(userIdFour);
        const response=await request(server).post('/api/v1/contact')
        .set('Content-type','application/json')
        .set('Authorization',`Bearer ${tokenThree}`)
        .send(testContactLast);
        expect(response.type).toBe('application/json');
        expect(JSON.stringify(response._body.id1)).toBe(JSON.stringify(testContactLast.senderId));
        expect(JSON.stringify(response._body.id2)).toBe(JSON.stringify(testContactLast.reciverId));
        contactIdLast=response._body._id;

    })

    //create message

    test("/Post create message route/sucess",async()=>{
        testMessageLast.senderId=userIdThree;
        testMessageLast.contactId=contactIdLast;
        const response=await request(server).post('/api/v1/message')
        .set('Content-type','application/json')
        .set('Authorization',`Bearer ${tokenThree}`)
        .send(testMessageLast)
        expect(response._body.message).toBeDefined();
        expect(JSON.stringify(response._body.message.contactId)).toBe(JSON.stringify(testMessageLast.contactId));
        expect(JSON.stringify(response._body.message.senderId)).toBe(JSON.stringify(testMessageLast.senderId));
    })

    test("/Post create message route/sucess",async()=>{
        testMessageLast.senderId=userIdThree;
        testMessageLast.contactId=contactIdLast;
        const response=await request(server).post('/api/v1/message')
        .set('Content-type','application/json')
        .set('Authorization',`Bearer ${tokenThree}`)
        .send(testMessageLast)
        expect(response._body.message).toBeDefined();
        expect(JSON.stringify(response._body.message.contactId)).toBe(JSON.stringify(testMessageLast.contactId));
        expect(JSON.stringify(response._body.message.senderId)).toBe(JSON.stringify(testMessageLast.senderId));
    })


    test("/Post create message route/sucess",async()=>{
        testMessageLast.senderId=userIdFour;
        testMessageLast.contactId=contactIdLast;
        const response=await request(server).post('/api/v1/message')
        .set('Content-type','application/json')
        .set('Authorization',`Bearer ${tokenFour}`)
        .send(testMessageLast)
        expect(response._body.message).toBeDefined();
        expect(JSON.stringify(response._body.message.contactId)).toBe(JSON.stringify(testMessageLast.contactId));
        expect(JSON.stringify(response._body.message.senderId)).toBe(JSON.stringify(testMessageLast.senderId));
    })

    test("/Post create message route/sucess",async()=>{
        testMessageLast.senderId=userIdFour;
        testMessageLast.contactId=contactIdLast;
        const response=await request(server).post('/api/v1/message')
        .set('Content-type','application/json')
        .set('Authorization',`Bearer ${tokenFour}`)
        .send(testMessageLast)
        expect(response._body.message).toBeDefined();
        expect(JSON.stringify(response._body.message.contactId)).toBe(JSON.stringify(testMessageLast.contactId));
        expect(JSON.stringify(response._body.message.senderId)).toBe(JSON.stringify(testMessageLast.senderId));
    })

    //get all message

    test("/Get all message with contactId message",async()=>{
        const response=await request(server).get(`/api/v1/message/${contactIdLast}`)
        .set('Content-type','application/json')
        .set('Authorization',`Bearer ${tokenThree}`)
        .send()
        expect(response._body.sendMessage).toBeDefined();
        expect(response._body.recivedMessage).toBeDefined();
        expect(response._body.error).toBeUndefined();


    })


    test("/Post create message for testing middleware message joi route/failure",async()=>{
        const response=await request(server).post('/api/v1/message')
        .set('Content-type','application/json')
        .set('Authorization',`Bearer ${tokenFour}`)
        .send(testMessageFieldOne)
        expect(response._body.error).toBeDefined();

    })


    test("/Post create message for testing middleware message joi route/failure",async()=>{
        const response=await request(server).post('/api/v1/message')
        .set('Content-type','application/json')
        .set('Authorization',`Bearer ${tokenFour}`)
        .send(testMessageFieldTwo)
        expect(response._body.error).toBeDefined();

    })




    
    
})


