const authJwt=require('../middleware/token-auth');
const express=require('express');
const router=express.Router();

const {
    updateUser,
    deleteUser,
    getUser
}=require('../controller/user');

//update path /:id patch
//delete path /:id delete
//get path /:id get


router.route('/').patch(updateUser).get(getUser).delete(deleteUser);
module.exports=router;