const express=require('express');

const router=express.Router();

const passport=require('passport');

const method=require('../config/passport-local-strategy');
 


const userController=require('../controllers/userController');




//userSignUp...................................................................
router.get('/userSignUp',userController.userSignUp)

//userSignIn....................................................................
router.get('/userSignIn',userController.userSignIn)

//createUser.....................................................................
router.post('/createUser',userController.createUser);

//create createUserSession.......................................................
router.post('/createUserSession',passport.authenticate('local',{failureRedirect:'/userSignUp'}) ,userController.createUserSession);

//userProfile..............................................................................................
router.get('/userProfile',passport.checkAuthentication ,userController.userProfile);

//userLogout................................................................................................
// router.get('/userLogout',(req,res)=>{
//     res.send("<h1>Logout successfully");
// });

router.get('/userLogout',userController.logoutUser);




module.exports=router;