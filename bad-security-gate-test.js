const express = require("express");
const { exec } = require("child_process");

const app = express();

app.get("/debug", (req, res) => {
  const userCode = req.query.code;

  // BAD: user input is executed directly
  eval(userCode);

  res.send("debug code executed");
});

app.get("/ping", (req, res) => {
  const host = req.query.host;

  // BAD: user input is passed into an operating system command
  exec("ping -c 1 " + host, (error, stdout, stderr) => {
    if (error) {
      return res.status(500).send(stderr);
    }

    res.send(stdout);
  });
});

app.listen(3000, () => {
  console.log("Bad security gate test app running on port 3000");
});
