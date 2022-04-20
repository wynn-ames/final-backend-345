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
  const { error } = loginValidation(req.body);
  if (error) return res.json(respond(false, "There was an error.", error));

  const usr = await Users.findOne({ email: req.body.email });
  if (!usr) {
    return res.json(respond(false, "Email or password is wrong."));
  }

  const validPass = await bcrypt.compare(req.body.password, usr.password);

  if (!validPass) {
    return res.json(respond(false, "Email or password is wrong."));
  }

  const token = jwt.sign({ _id: usr._id }, process.env.TOKEN_SECRET);

  res.json(respond(true, "Logged In", { token }));
});

module.exports = router;
