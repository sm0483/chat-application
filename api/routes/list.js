const express=require('express');
const { getUsers } = require('../controller/list');
const authJwt = require('../middleware/token-auth');
const router=express.Router();

router.route('/app').get(authJwt,getUsers);

module.exports=router