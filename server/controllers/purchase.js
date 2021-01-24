const mongoose = require("mongoose");
const ObjectId = require("mongodb").ObjectID;
const Posts = require("../model/posts");

const purchaseController = (req, res) => {
  const { email, postid } = req.body;

  const post = new Posts({
    purchasedBy: email,
    postid,
    isSold: true,
  });
  delete post._doc._id;

  Posts.findOneAndUpdate(
    { postid },
    post,
    { useFindAndModify: false },
    (err, dbRes) => {
      if (err) {
        console.log("Errored out", err);
        return res.send({ message: "Errored out" });
      }
      return res.status(201).json({ status: "success" });
    }
  );
};

module.exports = {
  purchaseController,
};
