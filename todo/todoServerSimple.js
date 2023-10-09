const express = require("express");
const app = express();
const port = 3001;
const bodyParser = require("body-parser");

app.use(bodyParser.json());

let todos = [];

const findIndex = (todos,id)=>{
    for(let i=0; i<todos.length;i++){
        if(id===todos[i].id){
            return i;
        }
    }
    return -1;
}

const removeAtIndex = (todos,index)=>{
    const newArray = [];
    for(let i=0;i<todos.length;i++){
        if(i!=index){
            newArray.push(todos[i])
        }
    }

    return newArray;

}


app.get("/todos", (req, res) => {
  res.status(200).json(todos);
});

app.post("/todos", (req, res) => {
  const newTodo = {
    id: Math.floor(Math.random() * 10000),
    title: req.body.title,
    description: req.body.description
  };

  todos.push(newTodo);
  res.status(200).json(newTodo)
});

app.put("/todos/:id", (req,res)=>{
    const todoIndex = findIndex(todos,parseInt(req.params.id))
    if(todoIndex===-1){
        res.status(404).send();
    } else {
        todos[todoIndex].title = req.body.title;
        todos[todoIndex].description = req.body.description;
        res.status(200).send("Todo Updated")
    }
})

app.delete("/todos/:id", (req,res)=>{
    const todoIndex = findIndex(todos,parseInt(req.params.id))

    if(todoIndex===-1){
        res.status(404).send()
    } else {
        todos = removeAtIndex(todos,todoIndex);
        res.status(200).send()
    }
  
   
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
