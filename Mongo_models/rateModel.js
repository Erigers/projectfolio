var mongoose=require('mongoose');

var rateSchema=new mongoose.Schema({
  projectId:{
    required:true,
    type :mongoose.Schema.Types.ObjectId
  },
  userId:{
    required:true,
    type :mongoose.Schema.Types.ObjectId
  },
  rateLevel:{
    required:true,
    type:Number
  }
});

var rateModel=mongoose.model('Rates',rateSchema);

module.exports={rateModel};
