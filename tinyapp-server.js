//required modules
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const PORT = process.env.PORT || 8080;

//middleware
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

//database

const urlDatabase = {
  "b2xVn2": "http://www.lighthouselabs.ca",
  "9sm5xK": "http://www.google.com"
};
//yas queen!
function generateRandomString() {
  let text = "";
  let possible = "QWERTYUIOPASDFGHJKLZXCVBNMqwertyuiopasdfghjklzxcvbnm1234567890";
  for(let i = 0; i < 7; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
};
//routing
app.get("/", (req, res) => {
  let templateVars = {
    username: req.cookies.username,
    };
  res.render("hometa", templateVars);
});

app.get("/urls.json", (req, res) => {
  res.json(urlDatabase);
});

app.get("/urls", (req, res) => {
  let templateVars = {
  urls: urlDatabase,
  username: req.cookies.username
  };
  res.render("urls_indexta", templateVars);
});

app.post("/urls", (req, res) => {
  console.log(req.body.longURL);
  let shortURL = generateRandomString();
  urlDatabase[shortURL] = req.body.longURL;
  res.redirect("/urls/" + shortURL);
});

app.get("/urls/new", (req, res) => {
  let templateVars = {
    username: req.cookies.username,
  };
  res.render("urls_newta", templateVars);
});

app.get("/urls/:id", (req, res) => {
  let longURL = urlDatabase[req.params.id];
  let templateVars = {
    username: req.cookies.username,
    shortURL: req.params.id,
    longURL: longURL,
    urlDatabase: urlDatabase
  };
  res.render("urls_showta", templateVars);
});

app.post("/urls/:id", (req, res) => {
  let shortURL = req.params.id;
  urlDatabase[shortURL] = req.body.longURL;
  res.redirect("/urls/" + shortURL);
});

app.get("/u/:id", (req, res) => {
  let longURL = urlDatabase[req.params.id];
  res.redirect(longURL);
});

app.post("/urls/:id/delete", (req, res) => {
  delete urlDatabase[req.params.id];
  res.redirect("/urls");
});

app.post("/login", (req, res) => {
  res.cookie("username", req.body.username);
  console.log(res.cookie.username);
  res.redirect("/");
})

app.post("/logout", (req, res) => {
  res.clearCookie("username");
  res.redirect("/");
})

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}!`);
});