const passport=require('passport');
const LocalStrategy=require('passport-local').Strategy;

const User=require('../models/user');

//using passport for authentication in userSignIn Controller SignIn
//telling passport using LocalStrategy to authentication 
passport.use(new LocalStrategy({

      usernameField:'email'  // defining username by email
    },
   function(email,password,done){    //here done is inbuilt callback function
 
      //find the user and establize the identity
      User.findOne({email:email}).then((user)=>{

        //if user is not found
        if(!user || user.password!=password){
          console.log('invalid username/password');
          return done(null,false); //there is no error(null) but authentication not done (false)
        }
        //if user is found
        return done(null,user)//athentication is done and return user
      }).catch(e=>{
        return done(e);
      });
   }
));

//serializing the user to decide which key is to kept in the cookie storing key into cookies
passport.serializeUser(function(user,done){

    done(null,user.id); // storing into cookies
});

//deserialize the user from key in cookies
passport.deserializeUser(function(id,done){

  User.findById(id).then((user)=>{ 
    return done(null,user) 
  }).catch((e)=>{ 
      console.log("error",e);
      return done(e);
    });    
  }
);

//check if the user is authenticated
passport.checkAuthentication=function(req,res,next){

  //if user is signed in then pass on next funtion controller's action

  if(req.isAuthenticated()){ //this detect wether user is signed in then pass to next function
    return next();
  }
  //if user is not signed in
  return res.redirect('/userSignIn');
}

//set the user for views
passport.setAuthenticatedUser=function(req,res,next){
if(req.isAuthenticated()){
  //req.user contains the current signed in user from the session cookie and we are just sending to locals for views
  res.locals.user=req.user;
}

}

module.exports=passport;