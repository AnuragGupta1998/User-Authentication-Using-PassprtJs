const User=require('../models/user')

module.exports.userSignUp=function(req,res){
    console.log('cookie inside singup',req.cookies);
    return res.render('userSignUp',{title:"userSignUp"});
    // return res.end('<h1> SignUp Page </h1>')
}

//user SignIn
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
    
    


//createUserSession
module.exports.createUserSession=function(req,res){
    //TODO creating seeion for user
    return res.render('userProfile',{title:'Passport Authentication'})
}

//profile page for user
module.exports.userProfile=function(req,res){

    return res.render('userProfile',{title:'profile of user'})

}

//logout from profile
module.exports.logoutUser=function(req,res){

}