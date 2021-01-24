const mongoose = require('mongoose');
const ObjectId = require('mongodb').ObjectID;
const Posts = require("../model/posts");

const postController = async (req, res) => {
    const { postid, email } = req.body;
    console.log('EMail', email)
    var post = new Posts({
        postid,
        email
    })
    post.save((err, dbRes)=>{
        if(err){
            console.log(err);
            res.status(501).json({"message":"Errored"})
        }
        res.status(201).json({postid, id: dbRes._id});
    })
}

const putController = async (req, res) => {
    console.log('PUT OPERATION');
    const { postid, adname, area, bedroom, price, images } = req.body;
    const post = new Posts({
        postid,
        bedroom,
        area,
        price,
        description: adname,
        images,
    })
    delete post._doc._id;
    Posts.findOneAndUpdate({postid}, post,{upsert: true, useFindAndModify: false}, (err, dbRes)=>{
        if(err){
          console.log('Errored out', err);
          return res.send({message:'Errored out'})
        } 
        return res.status(201).json({"status":"success"});
      });
}

const getPostsController = async(req, res) => {
    Posts.find({isSold: false}, (err, dbRes)=>{
        if(err){
            console.log(err)
             res.status(501).json({message:"Error"})
        }
         res.status(200).json({
            data: dbRes
        })
    })
}

const getPostByemail = async(req, res) => {
    const { email } = req.query;
    Posts.find({email}, (err, dbRes)=>{
        if(err){
            console.log(err)
             res.status(501).json({message:"Error"})
        }
         res.status(200).json({
            data: dbRes
        })
    })
}


module.exports = {
    postController,
    getPostsController,
    putController,
    getPostByemail
}