const express = require("express");
const { exec } = require("child_process");

const app = express();

// BAD: fake hardcoded secrets for security gate testing only
const AWS_ACCESS_KEY_ID = "AKIAIOSFODNN7EXAMPLE";
const AWS_SECRET_ACCESS_KEY = "wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY";

// BAD: eval executes user-controlled input
app.get("/debug", (req, res) => {
  const userInput = req.query.code;
  eval(userInput);
  res.send("debug executed");
});

// BAD: command injection risk
app.get("/ping", (req, res) => {
  const host = req.query.host;
  exec("ping -c 1 " + host, (error, stdout, stderr) => {
    if (error) {
      return res.status(500).send(stderr);
    }
    res.send(stdout);
  });
});

app.listen(3000, () => {
  console.log("Bad code target main test running");
});
