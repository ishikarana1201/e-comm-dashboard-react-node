const express = require("express");
const cors = require("cors");
require("./db/config");
const User = require("./db/User");
const Product = require("./db/Product");
const multer = require("multer");

// Path for image
// var router = express.Router();
// router.use(express.static(__dirname + "./public/"));

// jwt token

const Jwt = require("jsonwebtoken");
const path = require("path");
const JwtKey = "e-comm";
const app = express();
// app.use(express.static(path.join(__dirname, "public")));
// app.use(express.static(__dirname + "/public/uploads"));
// app.use(express.static("public"));
// app.use("/public/uploads", express.static("uploads"));
app.use(express.json());

app.use(cors());
app.use("/public/uploads/", express.static(__dirname + "/public/uploads/"));
// Multer middleware
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});
var upload = multer({
  storage: storage,
}).single("image");

// Add User API
// app.post("/register", async (req, res) => {
//   let user = new User(req.body);
//   let result = await user.save();
//   result = result.toObject();
//   delete result.password;
//   res.send(result);
// });
app.post("/register", async (req, res) => {
  let user = new User(req.body);
  let result = await user.save();
  result = result.toObject();
  delete result.password;
  Jwt.sign({ result }, JwtKey, { expiresIn: "2h" }, (err, token) => {
    if (err) {
      res.send({ result: "Something went wrong" });
    }
    res.send({ result, auth: token });
  });
});
// Login User API

// app.post("/login", async (req, res) => {
//   if (req.body.password && req.body.email) {
//     let user = await User.findOne(req.body).select("-password");
//     if (user) {
//       res.send(user);
//     } else {
//       res.send({ result: "No User Found with this cradentials" });
//     }
//   } else {
//     res.send({ result: "No User Found with this cradentials" });
//   }
// });
app.post("/login", async (req, res) => {
  if (req.body.password && req.body.email) {
    let user = await User.findOne(req.body).select("-password");
    if (user) {
      Jwt.sign({ user }, JwtKey, { expiresIn: "2h" }, (err, token) => {
        if (err) {
          res.send({ result: "Something went wrong" });
        }
        res.send({ user, auth: token });
      });
    } else {
      res.send({ result: "No User Found with this cradentials" });
    }
  } else {
    res.send({ result: "No User Found with this cradentials" });
  }
});

// Add Product API

app.post("/add-product", upload, verifyToken, async (req, res) => {
  // console.log("hello");
  req.body.image = req.file.path;
  let product = new Product(req.body);
  let result = await product.save();
  res.send(result);
});

// Product Listing API

app.get("/products", verifyToken, async (req, res) => {
  let products = await Product.find();
  if (products.length > 0) {
    res.send(products);
  } else {
    res.send({ result: "No Products Found" });
  }
});

// Delete Product API

app.delete("/product/:id", verifyToken, async (req, res) => {
  const result = await Product.deleteOne({ _id: req.params.id });
  res.send(result);
});

// Get Single Product API

app.get("/product/:id", verifyToken, async (req, res) => {
  const result = await Product.findOne({ _id: req.params.id });
  if (result) {
    res.send(result);
  } else {
    res.send({ result: "No record Found" });
  }
});

// Update Product API

app.put("/product/:id", upload, verifyToken, async (req, res) => {
  // req.body.image = req.file.path;
  const result = await Product.updateOne(
    { _id: req.params.id },
    { $set: req.body }
  );
  res.send(result);
});

// Search API

app.get("/search/:key", verifyToken, async (req, res) => {
  let result = await Product.find({
    $or: [
      { name: { $regex: req.params.key } },
      { company: { $regex: req.params.key } },
      { category: { $regex: req.params.key } },
      { price: { $regex: req.params.key } },
    ],
  });
  res.send(result);
});

// Verify Token middleware

function verifyToken(req, res, next) {
  let token = req.headers["authorization"];
  if (token) {
    token = token.split(" ")[1];
    // console.log("middleware Called", token);
    Jwt.verify(token, JwtKey, (err, valid) => {
      if (err) {
        res.status(401).send({ result: "Please provide valid token" });
      } else {
        next();
      }
    });
  } else {
    res.status(403).send({ result: "Please add token" });
  }
}

app.listen(4500);
