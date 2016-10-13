//required modules
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const PORT = process.env.PORT || 8080;

//middleware
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: false }));

//database

const urlDatabase = {
  "b2xVn2": "http://www.lighthouselabs.ca",
  "9sm5xK": "http://www.google.com"
};

//sending and recieving
app.get("/", (req, res) => {
  res.end("Hello!");
});

app.get("/urls.json", (req, res) => {
  res.json(urlDatabase);
});

app.get("/urls", (req, res) => {
  let templateVars = { urls: urlDatabase };
  res.render("urls_indexta", templateVars);
});

app.get("/urls/new", (req, res) => {
  res.render("urls_newta");
});

app.get("/urls/:id", (req, res) => {
  let templateVars = { shortURL: req.params.id };
  let longUrl = urlDatabase[req.params.id];
  res.render("urls_show", templateVars);
  // res.redirect('/');
  });

app.post("/urls", (req, res) => {
  console.log(req.body);

  res.redirect("/urls")
});

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}!`);
});