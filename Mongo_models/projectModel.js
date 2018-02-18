var mongoose=require('mongoose');

var projectmodel=mongoose.model('Projects',{
name:String,
description:String,
link:{type:String},
photo:{type:String,
  default:null},
category:{type:String,},
startDate:{type:Number,default:null},
endDate:{type:Number,default:null}

});

module.exports={
  projectmodel,
}
