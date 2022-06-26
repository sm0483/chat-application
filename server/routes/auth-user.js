const express=require('express');
const router=express.Router();

const {
    serveLogin,
    serveRegister,
    loginUser,
    createUser

}=require('../controller/user');


router.route('/auth/login').get(serveLogin).post(loginUser);
router.route('/auth/register').get(serveRegister).post(createUser)
// router.route('/auth/login').post(loginUser) // login user
// router.route('/:id').get(getUser).delete(deleteUser).patch(updateUser);




module.exports=router;