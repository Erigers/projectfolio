var express=require('express');
var bodyparser=require('body-parser');
var _=require('lodash')
var {mongoose}=require('./../Mongo-config/mongo_config');
var {projectmodel}=require('./../Mongo_models/projectModel');
var {authenticate}=require('./../usersRoutes/authenticate');
var router = express.Router();

router.use(bodyparser.json());

router.post('/',authenticate,(req,res)=>{
  var project=new projectmodel({
    name:req.body.name,
    description:req.body.description,
    link:req.body.link,
    photo:req.body.photo,
    category:req.body.category,
    startDate:req.body.startDate,
    endDate:req.body.endDate,
    duration:req.body.endDate-req.body.startDate,
    _creator:req.user._id
  });
  project.save().then((pro)=>{
    res.send({pro});
  }).catch((e)=>{
    //e.errors[_.toString(Object.keys(e.errors)[0])].message
    res.status(400).send(e);
  });

});

module.exports=router;
