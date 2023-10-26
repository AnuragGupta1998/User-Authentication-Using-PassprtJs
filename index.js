const express=require('express');
const port=8005;
const app=express();

const cookieParser=require('cookie-parser'); //require for reading and writing the cookie for manual authentication

const expressLayout=require('express-ejs-layouts');//express-ejs-layout required to render layout

const router=require('./routers/index');  //require all router

const db=require('./config/mongoose');//mogodb connected

const sassMiddleware = require('node-sass-middleware');//scss 

//used for session cookie..........................................................................................
const session=require('express-session');
const passport=require('passport');
const passportLocal=require('./config/passport-local-strategy');
const MongoStore=require('connect-mongo'); 



//middleware...........................................................................................................

app.use(sassMiddleware({
    src: '/assets/scss', //from where scss file
    dest: '/assets/css',  //where css code writen by scss
    debug: true, //if there is any error then debug true
    outputStyle: 'compressed', //scss in multipli line
    prefix:  '/css' //grom where server look out for css file
}))


app.use(express.static('assets'));//static middleware to assets css and js

app.use(express.urlencoded());//to read from form data

app.use(cookieParser());//read write of cookie

//layout middleware 
app.use(expressLayout)
app.set('layout extractStyles' ,true);  //extract style and script from sub pages of the layout.ejs inside views....
app.set('layout extractScripts' ,true); //extract style and script from sub pages of the layout.ejs inside views....

//view engine setting
app.set('view engine','ejs');
app.set('views','./views')

//used for session cookie
app.use(session({
    name:'anurag_cookie', //name of cookie
    //change secret before deployment in production
    secret:"Anurag",     //key for the ecryption/decryption
    saveUninitialized:false,//not save for invalid user
    resave:false, //do not save for already present user in DB

    cookie:{
        maxAge:(1000*60*100),  //maximug age of cookie
    },
    //storing session cookie into db by mangoose
    store:new MongoStore
    (
        {
            mongoUrl:'mongodb://localhost/userLoginDB',
    
            mongooseConnection:db,
            autoRemove:'disabled',
        },
        function(err){
            console.log(err||'connection estabilize btm mongoDB and express-session');
        }
    ), 
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(passport.setAuthenticatedUser) //user will set in locals  


//router middleware
app.use('/',router)




app.get('/home',function(req,res){
    return res.send('<h1>User Sign Up In Application With Authentication</h1>')
});



app.listen(port,(err)=>{
    if(err){
        console.log('error in server',e);
        return;
    }

    console.log(`server is up and running on port- ${port} `);
});