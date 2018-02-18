var express=require('express');
var bodyparser=require('body-parser');
var {mongoose}=require('./../Mongo-config/mongo_config');
var {projectmodel}=require('./../Mongo_models/projectModel');
var {ObjectID}=require('mongodb');


var router = express.Router();
router.use(bodyparser.json());

router.patch('/editproject/:id',(req,res)=>{
  var id=req.params.id;
  var body=req.body;
  if(!ObjectID.isValid(id)){
    return res.status(404).send();
  }

projectmodel.findByIdAndUpdate(id,{$set:body},{new:true}).then((pro)=>{
  if(!pro){
    res.status(404).send();
  }
  else{
    res.send({pro});
  }
}).catch((e)=>{
  res.status(400).send();
});

});


module.exports=router;
