const mongoose=require('mongoose');

 mongoose.connect('mongodb://localhost/userLoginDB');

 const db=mongoose.connection;

 db.on('error',console.error.bind(console,'Error while connecting to DataBase'));

 db.once('open',function(){
    console.log("connected to the MongoDB Database");
 });

 module.exports=db;