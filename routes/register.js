const bcrypt = require("bcryptjs");
const express = require("express");
const Users = require("../models/Users");

const { registerValidation, loginValidation } = require("../validation");

const router = express.Router();

router.post("/", async (req, res) => {
  //validate data
  const { error } = registerValidation(req.body);
  if (error) return res.status(401).send(error);

  const emailExist = await Users.findOne({ email: req.body.email });
  if (emailExist) {
    return res.status(401).send("email already exists");
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
    res.json(savedUser);
  } catch (err) {
    res.status(500).send(err);
    console.log("what");
  }
});

module.exports = router;
