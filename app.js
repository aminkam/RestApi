let express = require("express");
let app = express();
let connectDB = require("./config/conectDB");
const user = require("./models/user");
const User = require("./models/user");
require("dotenv").config({ path: "./config/.env" });
connectDB();
let PORT = process.env.PORT || 5000;
app.use(express.json());

//add user
app.post("/user/post", async (req, res) => {
  let { name, email, number } = req.body;
  try {
    let newUser = User({
      name,
      email,
      number,
    });
    await newUser.save();
    res.send(newUser);
  } catch (error) {
    console.log(error.message);
  }
});

//get user
app.get("/user/get", async (req, res) => {
  try {
    let users = await User.find();
    res.send(users);
  } catch (error) {
    console.log(error.message);
  }
});
//get user by ID
app.get("/user/get/:id", async (req, res) => {
  try {
    let theUser = await User.findById(req.params.id);
    res.send(theUser);
  } catch (error) {
    console.log(error.message);
  }
});

//Delte
app.delete("/user/delete/:id", async (req, res) => {
  try {
    let deleteUser = await User.findByIdAndDelete(req.params.id);
    res.send("user is deleted");
  } catch (error) {
    console.log(error.message);
  }
});

//Edit
app.put("/user/edit/:id", async (req, res) => {
  try {
    let editUser = await User.findByIdAndUpdate(
      req.params.id,
      { ...req.body },
      { new: true }
    );
    res.send(editUser);
  } catch (error) {
    console.log(error.message);
  }
});

app.listen(PORT, (err) =>
  err ? console.log(err) : console.log("Server is runing")
);
