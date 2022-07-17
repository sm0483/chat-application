const authJwt=require('../middleware/token-auth');
const express=require('express');
const router=express.Router();

const {
    updateUser,
    deleteUser,
    getUser
}=require('../controller/user');
const passwordAuth=require('../middleware/password-auth');
const supertokenValidate = require('../middleware/super-token-auth');


//update path /:id patch
//delete path /:id delete
//get path /:id get


router.route('/').patch(supertokenValidate,updateUser).get(authJwt,getUser).delete(supertokenValidate,deleteUser);

module.exports=router;