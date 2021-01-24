const { OAuth2Client } = require("google-auth-library");
const { v4: uuidv4 } = require('uuid');
const GUser = require("../model/user");
const REACT_APP_GOOGLE_CLIENT_ID =
  "1032362581409-na7ha747mqbsievi9kj2grip50o9dpu8.apps.googleusercontent.com";

const client = new OAuth2Client(REACT_APP_GOOGLE_CLIENT_ID);

const googleController = async (req, res) => {
  const { token } = req.body;
  let isAuth = false;
  let isRegistered = false;
  const ticket = await client.verifyIdToken({
    idToken: token,
    audience: REACT_APP_GOOGLE_CLIENT_ID,
  });
  const { name, email, picture } = ticket.getPayload();  
  GUser.findOne({
    email,
  }).then((user)=>{
      if(user && user.isRegistered) {          
        isAuth = true
      }

      var Guser = new GUser({
        email:email
      })
      if(user){
        delete Guser._doc._id;
      }
      GUser.findOneAndUpdate({email}, Guser,{upsert: true, useFindAndModify: false}, (err, dbRes)=>{
        if(err){
          console.log('Errored out', err);
          return res.send({message:'Errored out'})
        } 
        isRegistered = dbRes && dbRes.isRegistered;
        return res.status(201).json({email,isRegistered, isAuth, userType: user && user.userType})
      })
  }).catch((err)=>{
    res.status(501).json({
        message:
          "There was error creating user, please try after some time",
      });
  })

};

module.exports = {
  googleController,
};
