const passport=require('passport');
const LocalStrategy=require('passport-local').Strategy;

const User=require('../models/user');

//using passport for authentication in userSignIn Controller SignIn
passport.use(new LocalStrategy({

      usernameField:'email'  // keyword that we can define or we can't use, setting usernameField as email
    },
   function(email,password,done){

      User.findOne({email:email}).then((user)=>{

        if(!user || user.password!=password){
          console.log('invalid username/password');
          return done(null,false); //there is no error(null) but authentication not done (false)
        }

        return done(null,user)
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
                                      return done(e)
                                    });    
});

module.exports=passport;