const express = require("express");
const morgan = require("morgan");
const session = require("express-session");

const app = express();

app.use(morgan("combined"));

app.use(
  session({
    secret: "Well well well",
    resave: false,
    saveUninitialized: true
  })
);

app.get("/", (req, res, next) => {
  if (!req.session.userName && !req.session.visitCount) {
    req.session.userName = "sam";
    req.session.visitCount = 1;
    res.status(201).send(req.session);
  } else {
    req.session.visitCount += 1;
    res.status(200).send(req.session);
  }
});

app.listen(3000, () => {
  console.log("Server started!");
});
