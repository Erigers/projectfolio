var {userModel}=require('./../Mongo_models/usersModel');

var authenticate=(req,res,next)=>{
  var token=req.header('x-auth');
  userModel.findByToken(token).then((user)=>{
    if(!user){
      return Promise.reject();
    }
    else{
    req.user=user;
    req.token=token;
    next();
  }
}).catch((e)=>{
  res.status(401).send();
})
}




module.exports={authenticate};
