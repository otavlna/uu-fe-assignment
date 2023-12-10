const express = require("express");
var cors = require("cors");
const { listsMock, meMock } = require("./mocks");
const { listFactory } = require("./utils/listFactory");
const app = express();
const port = 3001;

app.use(cors());
app.use(express.json());

app.get("/lists", (req, res) => {
  res.send(listsMock);
});

app.post("/lists", (req, res) => {
  try {
    if (req.body.name == null) throw new Error();
    listsMock.push(listFactory(req.body.name, meMock.username, meMock.id));
    res.status(201).send();
  } catch (err) {
    res.status(400).send("Bad request");
  }
});

app.get("/lists/:listId", (req, res) => {
  const id = parseInt(req.params.listId);
  if (isNaN(id)) {
    res.status(400).send("Bad request");
    return;
  }
  const list = listsMock.find((list) => list.id === id);
  if (list === undefined) {
    res.status(404).send("List not found");
    return;
  }
  res.send(list);
});

app.delete("/lists/:listId", (req, res) => {
  const id = parseInt(req.params.listId);
  if (isNaN(id)) {
    res.status(400).send("Bad request");
    return;
  }
  const list = listsMock.find((list) => list.id === id);
  if (list === undefined) {
    res.status(404).send("List not found");
    return;
  }
  const i = listsMock.findIndex((list) => list.id === id);
  listsMock.splice(i, 1);
  res.status(200).send();
});

app.post("/lists/:listId/archive", (req, res) => {
  const id = parseInt(req.params.listId);
  if (isNaN(id)) {
    res.status(400).send("Bad request");
    return;
  }
  const list = listsMock.find((list) => list.id === id);
  if (list === undefined) {
    res.status(404).send("List not found");
    return;
  }
  listsMock[listsMock.findIndex((l) => l.id === id)] = {
    ...listsMock[listsMock.findIndex((l) => l.id === id)],
    isArchived: true,
  };
  res.status(201).send();
});

app.patch("/lists/:listId", (req, res) => {
  const id = parseInt(req.params.listId);
  const newList = req.body;
  if (isNaN(id) && newList == null) {
    res.status(400).send("Bad request");
    return;
  }
  const oldList = listsMock.find((list) => list.id === id);
  if (oldList === undefined) {
    res.status(404).send("List not found");
    return;
  }
  listsMock[listsMock.findIndex((l) => l.id === id)] = {
    ...newList,
    id: oldList.id,
  };
  res.status(200).send();
});

app.get("/me", (req, res) => {
  res.send(meMock);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
