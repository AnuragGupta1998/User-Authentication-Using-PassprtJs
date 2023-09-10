const express=require('express');

const router=express.Router();

const userController=require('../controllers/userController');



//userSignUp....
router.get('/userSignUp',userController.userSignUp)

router.get('/userSignIn',userController.userSignIn)



router.post('/createUser',userController.createUser)

router.post('/createUserSession',userController.createUserSession)

router.get('/userProfile',userController.userProfile)




module.exports=router;