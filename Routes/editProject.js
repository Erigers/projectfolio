var express=require('express');
var bodyparser=require('body-parser');
var {mongoose}=require('./../Mongo-config/mongo_config');
var {projectmodel}=require('./../Mongo_models/projectModel');
var {ObjectID}=require('mongodb');
var _=require('lodash');
var {authenticate}=require('./../usersRoutes/authenticate');

var router = express.Router();
router.use(bodyparser.json());

router.patch('/editProject/:id',authenticate,(req,res)=>{
  var id=req.params.id;
  var body=_.pick(req.body,['name','description','link','category','photo','startDate','endDate']);
  if(!ObjectID.isValid(id)){
    return res.status(404).send();
  }

projectmodel.findOneAndUpdate({_id:id,_creator:req.user._id},{$set:body},{new:true,
runValidators: true}).then((pro)=>{
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
