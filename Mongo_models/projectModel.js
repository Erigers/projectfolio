//var mongoosee=require('mongoose');
var validator=require('validator');
var _=require('lodash');


var {mongoose}=require('./../Mongo-config/mongo_config');

exist=(n)=>{
  return projectmodel.findOne({name:n}).then((res)=>{
    if(res)
    return false;
  })
};

var nameValidators = [
    { validator: validator.isAlphanumeric, msg: 'Name property should contain only letters and numbers.' },
    { validator: exist, msg: 'This project name already exists.' }
];


var projectmodel=mongoose.model('Projects',{
name:{type:String,
  validate:nameValidators,
trim:true,
minlength:[6,'Name should be at least 6 characters.'],
required:[true,'Name is required'],
},

description:{type:String,
default:null
},
link:{type:String,
  trim:true,
  minlength:[6,'Link should be at least 6  characters.'],
  required:[true,'Project link is required too.'],
   validate:[validator.isURL,'Url format not correct.']
},

photo:{type:String,
  default:null},

category:{type:String,
  trim:true,
  minlength:[3,'Categori name too short'],
  required:[true,"Categori name should not be blank"]
},

startDate:{type:Number,
  default:null,
},

endDate:{type:Number,
  default:null}

});

module.exports={
  projectmodel,
}
