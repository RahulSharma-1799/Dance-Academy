const express = require("express");
require("dotenv").config();
const path = require("path");
const app = express();
const port = 3000;
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
mongoose.connect(process.env.MONGODB_URL, {
  useUnifiedTopology: true,
  useNewUrlParser: true,
});
const contactSchema = new mongoose.Schema({
  name: String,
  phone: String,
  address: String,
  email: String,
  desc: String,
});
const Contact = mongoose.model("Contact", contactSchema);

// EXPRESS SPECIFIC STUFF
app.use("/static", express.static("static"));
app.use(express.urlencoded());

// PUG SPECIFIC STUFF
app.set("view engine", "pug");
app.set("views", path.join(__dirname, "views"));

app.get("/", (req, res) => {
  const params = {};
  res.status(200).render("home.pug", params);
});

app.get("/contact", (req, res) => {
  const params = {};
  res.status(200).render("contact.pug");
});

app.post("/contact", (req, res) => {
  var mydata = new Contact(req.body);
  mydata
    .save()
    .then(() => {
      res.send("This item has been saved to the database");
    })
    .catch(() => {
      res.send("Item was not saved to the database");
    });
  // res.status(200).render("contact.pug");
});

// START THE SERVER
app.listen(port, () => {
  console.log(`The application started successfully on port ${port}`);
});
