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


rateSchema.statics.averageRate=function(proId){
  var Rate=this;
  return this.find({projectId:proId}).then((rates)=>{
    var s=0;
    for(var i=0;i<rates.length;i++){
      s+=rates[i].rateLevel;
    }
    return s/rates.length
  }).catch(()=>{
    return Promise.reject();
  })
}

var rateModel=mongoose.model('Rates',rateSchema);

module.exports={rateModel};
