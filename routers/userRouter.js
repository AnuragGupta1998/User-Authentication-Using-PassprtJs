const express=require('express');

const router=express.Router();

const passport=require('passport');

const userController=require('../controllers/userController');



//userSignUp...................................................................
router.get('/userSignUp',userController.userSignUp)

//userSignIn....................................................................
router.get('/userSignIn',userController.userSignIn)

//createUser.....................................................................
router.post('/createUser',userController.createUser)

//create createUserSession.......................................................
router.post('/createUserSession',
    // this is middleware for the authentication of the user tha signining
    passport.authenticate('local',{failureRedirect:'/userSignIn'}),//if fail then redirect to '/userSignIn' router
    userController.createUserSession
)

//userProfile..............................................................................................
router.get('/userProfile',userController.userProfile);

//userLogout................................................................................................
router.get('/userLogout');



module.exports=router;