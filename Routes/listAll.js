var express=require('express');
var {mongoose}=require('./../Mongo-config/mongo_config');
var {projectmodel}=require('./../Mongo_models/projectModel');

var router = express.Router();
router.get('/',(req,res)=>{
  projectmodel.find().then((projects)=>{
    res.send({projects})
  }).catch((e)=>{
    res.status(400).send();
  })
})
module.exports=router;
