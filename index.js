const express = require("express");
const shortid = require("shortid");

const server = express();

server.use(express.json());

let users = [
  {
    id: shortid.generate(),
    name: "Brandon",
    bio: "just some dude tbh",
  },
  {
    id: shortid.generate(),
    name: "Nodnarb",
    bio: "the evil twin",
  },
];

// GET to /api/users
server.get("/api/users", (req, res) => {
  if (users) {
    res.status(200).json(users);
  } else {
    res.status(500).json({
      errorMessage: "Error: User not found.",
    });
  }
});

// POST to /api/users
server.post("/api/users", (req, res) => {
  const user = req.body;
  user.id = shortid.generate();

  if (!user.name || !user.bio) {
    res.status(400).json({
      errorMessage: "Error (400): user name and bio is required.",
    });
  } else if (user === undefined) {
    res.status(500).json({
      errorMessage: "Error (500): user information is undefined",
    });
  } else {
    users.push(user);
    res.status(200).json(users);
  }
});

// GET(by ID) to /api/users/:id
server.get("/api/users/:id", (req, res) => {
  const user = users.find(u => u.id === req.params.id);

  if (user) {
    res.status(200).json(user);
  } else if (user === undefined) {
    res.status(404).json({
      errorMessage: "Error (404): USER ID DOES NOT EXIST",
    });
  } else {
    res.status(500).json({
      errorMessage: "Error (500): User ID not found",
    });
  }
});

// PUT to /api/users/:id
server.put("/api/users/:id", (req, res) => {
  let user = users.find(u => u.id === req.params.id);

  const updates = req.body;

  if (!updates.name || !updates.bio) {
    res.status(404).json({
      errorMessage: "Error (404): Name and bio required.",
    });
  } else if (user) {
    Object.assign(user, updates);
    res.status(200).json(user);
  } else {
    res.status(500).json({
      errorMessage: "Error (500): User could not be updated.",
    });
  }
});

// DELETE
server.delete("/api/users/:id", (req, res) => {
  const id = req.params.id;

  if (id) {
    users = users.filter(u => u.id != Number(id));
    res.status(200).json(users);
  } else {
    res.status(404).json({
      errorMessage: "Error (404): User ID does not exist.",
    });
  }

  // const name = req.params.name;

  // users = users.filter(u => u.name !== name);

  // res.status(204).end;
});

const port = 8888;
server.listen(port, () =>
  console.log(`runnin on eights bud 👉 Port#: ${port}`)
);

server.get("/hello", (req, res) => {
  res.send("ASAH DU");
});
