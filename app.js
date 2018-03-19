var createProject=require('./Routes/createProject.js');
var editProject=require('./Routes/editProject');
var listAll=require('./Routes/listAll');
var filter=require('./Routes/filter');
var express=require('express');
var bodyparser=require('body-parser');
var app=express();
var {userMode}=require('./Mongo_models/usersModel');
var user=require('./usersRoutes/sign_up_log_in_and_sign_out');
var rate=require('./Routes/rateProject');
app.use(bodyparser.json());

app.use('/createProject',createProject);
app.use('/',editProject);
app.use('/listAll',listAll);
app.use('/',filter);
app.use('/',user);
app.use('/',rate);

app.listen(3000,()=>{
  console.log('Server listening on port 3000');
});
