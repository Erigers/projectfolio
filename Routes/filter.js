var express=require('express');
var {mongoose}=require('./../Mongo-config/mongo_config');
var {projectmodel}=require('./../Mongo_models/projectModel');
var _=require('lodash');
var router=express.Router();

router.get('/projects/search',(req,res)=>{

var s=req.query.startDate;
var e=req.query.endDate;
var category=req.query.category;
var duration=req.query.duration;

if(s!==undefined&&category===undefined&&duration===undefined){
  projectmodel.find({startDate:{$gte:s},
  endDate:{$lte:e}}).then((projects)=>{
      res.send({projects});
  }).catch((e)=>{
    res.status(404).send(e);
  });
}


else if(category!==undefined&&s===undefined&&duration===undefined){

    projectmodel.find({category:category}).then((projects)=>{
      res.send(projects);
    }).catch((e)=>{res.status(404).send();
    });

}


else if(s!==undefined&&category!==undefined&&duration===undefined){

    projectmodel.find({startDate:{$gte:s},
    endDate:{$lte:e},
  category:category}).then((projects)=>{
      res.send(projects);
    }).catch((e)=>{res.status(404).send();
    });

}


else if(s===undefined&&category===undefined&&duration==='stl'){
  projectmodel.find().sort({duration:1}).then((projects)=>{
    res.send(projects);
  }).catch((e)=>{
    res.status(400).send(e);
  })
}


else if(s===undefined&&category===undefined&&duration==='lts'){

    projectmodel.find().sort({duration:-1}).then((projects)=>{
      res.send(projects);
    }).catch((e)=>{
      res.status(400).send(e);
    });

}


else if(s!==undefined&&category===undefined&&duration==='stl'){
  projectmodel.find({startDate:{$gte:s},endDate:{$lte:e}}).sort({duration:1}).then((projects)=>{
    res.send(projects);
  }).catch((e)=>{
    res.status(400).send(e);
  })
}



else if(s!==undefined&&category===undefined&&duration==='lts'){
  projectmodel.find({startDate:{$gte:s},endDate:{$lte:e}}).sort({duration:-1}).then((projects)=>{
    res.send(projects);
  }).catch((e)=>{
    res.status(400).send(e);
  })
}



else if(s===undefined&&category!==undefined&&duration==='stl'){
  projectmodel.find({category}).sort({duration:1}).then((projects)=>{
    res.send(projects);
  }).catch((e)=>{
    res.status(400).send(e);
  })
}



else if(s===undefined&&category!==undefined&&duration==='lts'){
  projectmodel.find({category}).sort({duration:-1}).then((projects)=>{
    res.send(projects);
  }).catch((e)=>{
    res.status(400).send(e);
  })
}


else if(s!==undefined&&category!==undefined&&duration==='stl'){
  projectmodel.find({category:category,startDate:{$gte:s},endDate:{$lte:e}}).sort({duration:1}).then((projects)=>{
    res.send(projects);
  }).catch((e)=>{
    res.status(400).send(e);
  })
}


else if(s!==undefined&&category!==undefined&&duration==='lts'){
  projectmodel.find({category:category,startDate:{$gte:s},endDate:{$lte:e}}).sort({duration:-1}).then((projects)=>{
    res.send(projects);
  }).catch((e)=>{
    res.status(400).send(e);
  })
}

else{
  res.status(400).send('eni');
}
});

router.get('/projects/search/rates',(req,res)=>{

});



// router.get('/projects/category',(req,res)=>{
//   var category=req.query.category;
//   projectmodel.find({category:category}).then((projects)=>{
//     res.send(projects);
//   }).catch((e)=>{res.status(404).send();
//   });
// });






module.exports=router;
