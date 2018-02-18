var createProject=require('./Routes/createProject.js');
var editProject=require('./Routes/editProject')
var express=require('express');
var bodyparser=require('body-parser');
var app=express();

app.use(bodyparser.json());

app.use('/createProject',createProject);
app.patch('/editproject/:id',editProject);


app.listen(3000,()=>{
  console.log('Server listening on port 3000');
});
