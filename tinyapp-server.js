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
  res.render("hometa");
});

app.get("/urls.json", (req, res) => {
  res.json(urlDatabase);
});

app.get("/urls", (req, res) => {
  let templateVars = { urls: urlDatabase };
  res.render("urls_indexta", templateVars);
});

app.post("/urls", (req, res) => {
  console.log(req.body.longURL);
  let shortURL = generateRandomString();
  urlDatabase[shortURL] = req.body.longURL;
  res.redirect("/urls/" + shortURL);
});

app.get("/urls/new", (req, res) => {
  res.render("urls_newta");
});

// app.post("/urls/new", (req, res) => {
//   console.log(req.body.longURL);
//   res.redirect("/urls");
// });

app.get("/urls/:id", (req, res) => {
  let templateVars = { shortURL: req.params.id };
  let longURL = urlDatabase[req.params.id];
  res.render("urls_showta", templateVars);
  //res.redirect('/');
});

app.get("/u/:id", (req, res) => {
  let longURL = urlDatabase[req.params.id];
  res.redirect(longURL);
})

function generateRandomString() {
  let text = "";
  let possible = "QWERTYUIOPASDFGHJKLZXCVBNMqwertyuiopasdfghjklzxcvbnm1234567890";
  for(let i = 0; i < 7; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
};

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}!`);
});