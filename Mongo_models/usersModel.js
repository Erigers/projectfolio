var mongoose=require('mongoose');
var _=require('lodash');
var validator=require('validator');
var bcrypt=require('bcryptjs');
var jwt=require('jsonwebtoken');


var userSchema=new mongoose.Schema({
  email:{
    type:String,
    trim:true,
    minlength:6,
    unique:true,
    required:true,
    validate:{validator:validator.isEmail,message:'{VALUE} is not a valid email!'},

  },
  password:{
    type:String,
    required:true,
    trim:true,
    minlength:[6,'Password should be more than 6 characters!'],

  },
  tokens:[
    {
      access:{type:String,
        required:true,
      },
      token:{
        type:String,
        required:true
      }
    }
  ]
});

userSchema.methods.generateAuthTokens=function(){
  var user =this;
  var access='auth';
  var token=jwt.sign({_id:user._id.toHexString(),access},'secret').toString();
  user.tokens.push({access,token});
  return user.save().then(()=>{
    return token;
  }).catch((e)=>{
    return Promise.reject(e);
  });
};

userSchema.methods.toJSON=function(){
  var user=this;
  var userObj=this.toObject();
  return _.pick(userObj,['email','_id']);
}


userSchema.statics.findByToken=function(token){
  User=this;
  var decoded;
  try{
    decoded=jwt.verify(token,'secret');
  }
  catch(e){
    return Promise.reject();
  }

return  User.findOne(
  {'_id':decoded._id,
  'tokens.token':token,
'tokens.access':'auth'});
}
//hash password
userSchema.pre('save',function(next){
  var user=this;
  if(user.isModified('password')){
    bcrypt.genSalt(10,(err,salt)=>{
      bcrypt.hash(user.password,salt,(err,hash)=>{
        user.password=hash;
        next();
      })
    })
  }
  else{
    next();
  }

});

userSchema.statics.findByCredintial=function(email,password){
  var User=this;
  return User.findOne({email}).then((user)=>{
    if(!user){
      return Promise.reject();
    }
    else{
      return new Promise((resolve,reject)=>{
        bcrypt.compare(password,user.password,(err,bool)=>{
          if(!bool){
             reject();
          }
          else{
             resolve(user);
          }
        });
      });
    }
  });
};

userSchema.methods.deleteToken=function(token){
  var user=this;
  return user.update({$pull:{tokens:{token}}})
}

var userModel=mongoose.model('Users',userSchema);

module.exports={userModel};
