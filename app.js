var createProject=require('./Routes/createProject.js');
var express=require('express');
var bodyparser=require('body-parser');
var app=express();

app.use(bodyparser.json());

app.use('/createProject',createProject);



app.listen(3000,()=>{
  console.log('Server listening on port 3000');
});
