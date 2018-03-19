var express=require('express');
var {mongoose}=require('./../Mongo-config/mongo_config');
var {rateModel}=require('./../Mongo_models/rateModel');
var {authenticate}=require('./../usersRoutes/authenticate');
var {projectmodel}=require('./../Mongo_models/projectModel');
var router=express.Router();

router.post('/rate',authenticate,(req,res)=>{
  var projectId=req.query.id;
  var rateLevel=req.query.level;
  var userId=req.user._id;
  if(rateLevel>=0&&rateLevel<=5){
projectmodel.findOne({_id:projectId}).then((project)=>{
  if(!project){
    return res.status(400).send();
  }
  else{

  rateModel.findOne({projectId,
  userId}).then((yes)=>{
    if(!yes){
      var ratePro=new rateModel({
        projectId,
        rateLevel,
        userId
      });
      ratePro.save().then((pro)=>{
        res.status(200).send();
      }).catch((e)=>{
        res.status(400).send(e);
      })
    }
    else{
      return res.status(400).send();
    }
  })


  }
}).catch((e)=>{
  res.status(400).send(e);
})

  }
  else {

      res.status(400).send();

  }
});


module.exports=router;
