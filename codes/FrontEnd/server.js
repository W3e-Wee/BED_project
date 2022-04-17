// --------------------------------
// imports
// --------------------------------
const express = require("express");
const app = express();

const path = require('path');

// --------------------------------
// imports
// --------------------------------
app.get("/", (req, res) => {
  res.sendFile("/public/index.html", { root: __dirname });
});

app.get("/login", (req, res) => {
  res.sendFile("/public/login.html", { root: __dirname });
});

app.get("/category/", (req, res) => {
  res.sendFile("/public/category.html", { root: __dirname });
});

app.get("/products/", (req, res) => {
  res.sendFile("/public/products.html", { root: __dirname });
});

app.get("/products/add/", (req, res) => {
  res.sendFile("/public/addProduct.html", {root: __dirname});
})

app.get("/category/add/", (req, res) => {
  res.sendFile("/public/addCategory.html", {root: __dirname});
})

app.get("/products/view", (req, res) => {
  res.sendFile("/public/viewProduct.html", {root: __dirname});
})

app.get("/search", (req,res) => {
  res.sendFile("/public/searchPage.html", {root: __dirname});
})

app.get("/profile", (req, res) => {
  res.sendFile("/public/profile.html", {root: __dirname});
});

app.get("/register", (req, res) => {
  res.sendFile("/public/registration.html", {root: __dirname});
})

app.get("/profile/edit", (req, res) => {
  res.sendFile("/public/editProfile.html", {root:__dirname});
})

var publicDir = path.join(__dirname, '/public');
app.use(express.static(publicDir));


// --------------------------------
// config
// --------------------------------
const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Client server has started listening on port ${PORT}`);
});
