const express=require('express');
const port=8005;
const app=express();

const cookieParser=require('cookie-parser'); //require for reading and writing the cookie for manual authentication

const expressLayout=require('express-ejs-layouts');//express-ejs-layout required to render layout

const router=require('./routers/index');  //require all router

const db=require('./config/mongoose');//mogodb connected

//used for session cookie..........................................................................................
// const session=require('express-session');
// const passport=require('passport');
// const passportLocal=require('./config/passport-local-strategy')



//middleware...........................................................................................................

app.use(express.static('assets'));//static middleware to assets

app.use(express.urlencoded());//to read from from data\

app.use(cookieParser());//read write of cookie

//layout middleware
app.use(expressLayout)
app.set('layout extractStyles' ,true);  //extract style and script from sub pages of the layout.ejs inside views....
app.set('layout extractScripts' ,true); //extract style and script from sub pages of the layout.ejs inside views....

//view engine setting
app.set('view engine','ejs');
app.set('views','./views')

//used for session cookie
// app.use(session({
//     name:'anurag_cookie',
//     secret:"Anurag",
//     saveUninitialized:false,
//     resave:false,

//     cookie:{
//         maxAge:(1000*60*100),
//     }
// }));
// app.use(passport.initialize());
// app.use(passport.session());


//router middleware
app.use('/',router)




app.get('/home',function(req,res){
    return res.end('<h1>User Sign Up In Application With Authentication</h1>')
});

app.listen(port,(err)=>{
    if(err){
        console.log('error in server',e);
        return;
    }

    console.log(`server is up and running on port- ${port} `);
});