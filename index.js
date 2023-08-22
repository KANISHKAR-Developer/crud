const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const RegisterModel = require("./models/Register");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

mongoose
  .connect(process.env.DB_CONNECTION)
  .then(() => {
    console.log("db connected to server");
  })
  .catch((err) => {
    console.log(err);
  });

app.post("/register", (req, res) => {
  const { name, email, password } = req.body;
  RegisterModel.findOne({ email: email })
    .then((user) => {
      if (user) {
        res.json("Already have an account");
      } else {
        RegisterModel.create({ name: name, email: email, password: password })
          .then((result) => res.json("account created"))
          .catch((err) => res.json("error"));
      }
    })
    .catch((err) => res.json(err));
});
const port = process.env.PORT || 3001;

app.listen(port, () => {
  console.log("server is running");
});
