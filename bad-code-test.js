const express = require("express");
const app = express();

app.get("/unsafe", (req, res) => {
  eval(req.query.code);
  res.send("unsafe code executed");
});
