var {mongoose}=require('./../Mongo-config/mongo_config');
var {userModel}=require('./../Mongo_models/usersModel');
var express=require('express');

var _=require('lodash');
var {authenticate}=require('./authenticate');
var bodyparser=require('body-parser');
var router=express.Router();
router.use(bodyparser.json());


router.post('/users/signup',(req,res)=>{
  var body=_.pick(req.body,['email','password']);
  var user=new userModel(body);
  user.save().then(()=>{
    return user.generateAuthTokens();
  }).then((token)=>{
    res.header('x-auth',token).send(user);
  }).catch((e)=>{
    res.status(400).send(e);
  });
});


router.get('/users/me',authenticate,(req,res)=>{
res.send(req.user);
})


router.post('/users/login',(req,res)=>{
    var body=_.pick(req.body,['email','password']);
    userModel.findByCredintial(body.email,body.password).then((user)=>{
      return user.generateAuthTokens().then((token)=>{
        res.header('x-auth',token).send(user);
      });
    }).catch((e)=>{
      res.status(400).send();
    })
  });


router.delete('/users/signout',authenticate,(req,res)=>{
  req.user.deleteToken(req.token).then(()=>{
    res.status(200).send();
  }).catch((e)=>{
    res.status(400).send(e);
  })
})

module.exports=router;
