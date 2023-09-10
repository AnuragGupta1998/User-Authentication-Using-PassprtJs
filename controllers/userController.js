const User=require('../models/user');

//user SignUp.............................................................................
module.exports.userSignUp=function(req,res){
    console.log('cookie inside singup',req.cookies);
    return res.render('userSignUp',{title:"userSignUp"});
    // return res.end('<h1> SignUp Page </h1>')
}

//user SignIn.............................................................................
module.exports.userSignIn=function(req,res){
    return res.render('userSignIn',{title:"userSignIn"});
}

//createUser................................................................................
module.exports.createUser=function(req,res){
    //TODO create user
    //checking password with confirm_password
    console.log('cookie inside ceate User',req.cookies);
    
    if(req.body.password != req.body.confirm_password){
        console.log("password did not matching confirm_password");
        return res.redirect('back');
    }

    //finding user by email into db
    User.findOne({email:req.body.email}).then(user=> {
        if(!user){

            console.log("User Not Found in Db");

            User.create(req.body);
            console.log("user created");
            return res.redirect('/userSignIn');
        }

        else{
            console.log('cookie inside findOne email',);
            console.log('user already in DB');
            return res.redirect('/userSignIn');
        }
    }).catch(err=>console.log(err));
}
    
    
//createUserSession.................................................................................................
module.exports.createUserSession=function(req,res){
    //TODO creating session for user

    //checking email is valid or not in DB
    // if(User.email!=req.body.email){

    //     console.log('email is not valid please SignUp');
    //     return res.redirect('/userSignUp');
    // }
    
    //other checks as well of incoming request from user
    User.findOne({email:req.body.email}).then((user)=>{
         console.log("User Email found in database ",user.email);

         if(user.password!=req.body.password){
            console.log('password did not mathch plese re-enter your password');
            return res.redirect('/userSignIn');
         }

         console.log('user is validate his password',user.password);

         res.cookie('user_id',user.id);// storing cookies inside browser with user_id name(header)
         return res.redirect('/userProfile');

        }).catch(e=>{
        console.log("Email not found please SignUp");
        return res.redirect('/userSignUp');
    });


}

//profile page for user
module.exports.userProfile=function(req,res){

    return res.render('userProfile',{title:'profile of user'})

}

//logout from profile
module.exports.logoutUser=function(req,res){

}