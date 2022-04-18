const express = require("express");
const verify = require("./verifyToken");
const Users = require("../models/Users");

const router = express.Router();

router.get("/", verify, (req, res) => {
  const data = Users.findById(req.user._id, async (error, data) => {
    if (error) {
      console.log(error);
    } else {
      console.log(data);
      res.send(data);
    }
  });
});

router.get("/update", verify, async (req, res) => {
  let user = await Users.findById(req.user._id);
  user.data = req.body.data;
  await user.save();
  res.send(user);
});

router.delete("/", verify, (req, res) => {
  const data = Users.findByIdAndDelete(req.user._id, async (error, data) => {
    if (error) {
      console.log(error);
    } else {
      console.log(data);
      res.send(data);
    }
  });
});

module.exports = router;
