const express = require("express");
const mysql = require("mysql2");
const path = require("path");
const dotenv = require("dotenv");

dotenv.config({ path: "./.env" });

//Creat Connection
const db = mysql.createConnection({
  host: process.env.HOST,
  user: process.env.USER,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
});

//Connect to DataBase
db.connect((err) => {
  if (err) {
    console.log(err);
  } else {
    console.log("Connection Successful");
  }
});

const app = express();
app.listen("3000", () => {
  console.log("Listening to port 3000");
});

app.use(express.static(path.join(__dirname, "./public")));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.set("views", path.join(__dirname, "./views"));
app.set("view engine", "ejs");

app.get("/user", (req, res) => {
  try {
    res.render("UserInsert", {
      title: "User Add",
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      status: "Fail",
      message: "Server Error!",
    });
  }
});

app.post("/user", (req, res) => {
  try {
    // const username = req.body.username;
    // const pw = req.body.password;
    let valuePosting = req.body;
    const sql = "INSERT INTO student SET ?";
    // console.log(valuePosting);
    db.query(sql, valuePosting, (err) => {
      if (err) {
        console.log(err);
      } else {
        res.status(200).json({ message: "Inserted student data successfully" });
      }
    });
  } catch {
    console.log(err);
    res.status(500).json({
      status: "Fail",
      message: "Server Error!",
    });
  }
});

app.post("/faculty", (req, res) => {
  try {
    let valuePosting = req.body;
    const sql = "INSERT INTO faculty SET ?";
    // console.log(valuePosting);
    db.query(sql, valuePosting, (err) => {
      if (err) {
        console.log(err);
      } else {
        res.status(200).json({ message: "Inserted faculty data successfully" });
      }
    });
  } catch {
    console.log(err);
    res.status(500).json({
      status: "Fail",
      message: "Server Error!",
    });
  }
});
