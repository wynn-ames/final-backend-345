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

router.patch("/", verify, async (req, res) => {
  let user = await Users.findById(req.user._id);
  console.log(req.body);
  const { auth, budget, expenses } = req.body;
  user.data = JSON.stringify({ budget, expenses });
  user.name = auth.name;
  user.email = auth.email;
  user.phone = auth.phone;
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
