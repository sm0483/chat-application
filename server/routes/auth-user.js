const express=require('express');
const router=express.Router();

const {
    loginUser,
    registerUser,
    deleteUser,
    updateUser,
    getUser

}=require('../controller/user');

router.route('auth/register').post(registerUser) //create user
router.route('auth/login').post(loginUser) // login user
router.route('/:id').get(getUser).delete(deleteUser).patch(updateUser);




module.exports=router;