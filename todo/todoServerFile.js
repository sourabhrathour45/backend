const express = require("express");
const app = express();
const port = 3001;
const bodyParser = require("body-parser");
const fs = require("fs");
const cors = require("cors")

app.use(bodyParser.json());
app.use(cors())

const findIndex = (todos, id) => {
  for (let i = 0; i < todos.length; i++) {
    if (id === todos[i].id) {
      return i;
    }
  }
  return -1;
};

app.get("/todos", (req, res) => {
  fs.readFile("todos.json", "utf-8", (err, data) => {
    if (err) throw err;
    res.status(200).json(JSON.parse(data));
  });
});

app.post("/todos", (req, res) => {
  let newTodo = {
    id: Math.floor(Math.random() * 10000),
    title: req.body.title,
    description: req.body.description,
  };

  fs.readFile("todos.json", "utf-8", (err, data) => {
    if (err) throw err;
    const todos = JSON.parse(data);
    todos.push(newTodo);

    fs.writeFile("todos.json", JSON.stringify(todos), (err) => {
      if (err) throw err;
      res.status(200).send("Todo Added!");
    });
  });
});

app.delete("/todos/:id", (req, res) => {
  fs.readFile("todos.json", "utf-8", (err, data) => {
    if (err) throw err;
    let todos = JSON.parse(data);
    let updatedTodos = [];
    const todoIndex = findIndex(todos, parseInt(req.params.id));
    for (let i = 0; i < todos.length; i++) {
      if (i != todoIndex) {
        updatedTodos.push(todos[i]);
      }
    }

    fs.writeFile("todos.json", JSON.stringify(updatedTodos), (err) => {
      if (err) throw err;
      res.status(200).send("Todo Deleted!");
    });
  });
});

app.put("/todos/:id", (req, res) => {
  fs.readFile("todos.json", "utf-8", (err, data) => {
    if (err) throw err;
    let todos = JSON.parse(data);

    const todoIndex = findIndex(todos, parseInt(req.params.id));
    for (let i = 0; i < todos.length; i++) {
      if (i === todoIndex) {
        todos[i].title = req.body.title;
        todos[i].description = req.body.description;
      }
    }

    fs.writeFile("todos.json", JSON.stringify(todos), (err) => {
      if (err) throw err;
      res.status(200).send("Todo Updated!");
    });
  });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
