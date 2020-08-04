const express = require("express");
const shortid = require("shortid");

const server = express();

server.use(express.json());

const port = 8888;
server.listen(port, () => console.log(`runnin on eights bud 👉 ${port}`));

server.get("/hello", (req, res) => {
  res.send("ASAH DU");
});
