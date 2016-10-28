//Required modules
const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const PORT = process.env.PORT || 8080;
const app = express();

//Middleware
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

//Database
const urlDatabase = {
  "b2xVn2": "http://www.lighthouselabs.ca",
  "9sm5xK": "http://www.google.com"
};
//Random string generator
function generateRandomString() {
  return Math.random().toString(36).substring(2,8);
};
//Routing
app.get("/", (req, res) => {
  let templateVars = {
    username: req.cookies.username,
    };
  res.render("home", templateVars);
});

app.get("/urls.json", (req, res) => {
  res.json(urlDatabase);
});

app.get("/urls", (req, res) => {
  let templateVars = {
  urls: urlDatabase,
  username: req.cookies.username
  };
  res.render("urls_index", templateVars);
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
  res.render("urls_new", templateVars);
});

app.get("/urls/:id", (req, res) => {
  let longURL = urlDatabase[req.params.id];
  let templateVars = {
    username: req.cookies.username,
    shortURL: req.params.id,
    longURL: longURL,
    urlDatabase: urlDatabase
  };
  res.render("urls_show", templateVars);
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
//Create a registration page
app.get("/register", (req, res) => {
  let templateVars = {
    email: req.body.email,
  };
  res.render("urls_new", templateVars);
})

app.post("/register", (req, res) => {
  res.cookie("email", req.body.email);
  res.redirect("/");
})

app.post("/login", (req, res) => {
  res.cookie("username", req.body.username);
  res.redirect("/");
})

app.post("/logout", (req, res) => {
  res.clearCookie("username");
  res.redirect("/");
})

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}!`);
});