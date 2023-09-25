const express = require("express");
const app = express();
const bodyParser = require("body-parser")

const port = 3000;

app.use(bodyParser.json())

// app.get(route, callback fn)

const calculateSum = (counter) => {
  let sum = 0;

  for (let i = 1; i <= counter; i++) {
    sum += i;
  }

  return sum;
};


app.post("/", (req, res) => {
  const counter = req.body.counter
  const result = calculateSum(counter)
  res.send(`The sum is : ${result}`);
});

// comment 

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

