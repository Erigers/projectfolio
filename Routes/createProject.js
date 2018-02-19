var express=require('express');
var bodyparser=require('body-parser');
var _=require('lodash')
var {mongoose}=require('./../Mongo-config/mongo_config');
var {projectmodel}=require('./../Mongo_models/projectModel');

var router = express.Router();
var app=express();
router.use(bodyparser.json());

router.post('/',(req,res)=>{
  var project=new projectmodel({
    name:req.body.name,
    description:req.body.description,
    link:req.body.link,
    photo:req.body.photo,
    category:req.body.category,
    startDate:req.body.startDate,
    endDate:req.body.endDate,

  })
  project.save().then((pro)=>{
    res.send({pro});
  }).catch((e)=>{
    res.status(400).send(e.errors[_.toString(Object.keys(e.errors)[0])].message);
  });

});

module.exports=router;
