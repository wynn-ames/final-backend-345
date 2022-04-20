const bcrypt = require("bcryptjs");
const express = require("express");
const Users = require("../models/Users");
const jwt = require("jsonwebtoken");

const { registerValidation, loginValidation } = require("../validation");

const router = express.Router();

function respond(success, message, res = null) {
  return { success, message, res };
}

router.post("/", async (req, res) => {
  //validate data
  const { error } = registerValidation(req.body);
  if (error) return res.json(respond(false, "Feilds are invalid."));

  const emailExist = await Users.findOne({ email: req.body.email });
  if (emailExist) {
    return res.json(respond(false, "Email is already used."));
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(req.body.password, salt);

  const user = new Users({
    name: req.body.name,
    email: req.body.email,
    phone: req.body.phone,
    password: hashedPassword,
  });

  try {
    const savedUser = await user.save();
    const token = jwt.sign({ _id: savedUser._id }, process.env.TOKEN_SECRET);
    res.json(respond(true, "New user registered.", { token }));
  } catch (err) {
    res.json(respond(false, "Unable to register."));
    console.log("what");
  }
});

module.exports = router;
