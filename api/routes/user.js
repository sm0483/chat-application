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
const updateValidate=require('../middleware/updateValidate');


//update path /:id patch //don't allow to update mail id as policy
//delete path /:id delete
//get path /:id get validate user data with joi


router.route('/').patch(supertokenValidate,updateValidate,updateUser).get(authJwt,getUser).delete(supertokenValidate,deleteUser);

module.exports=router;