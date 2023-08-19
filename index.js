const express = require("express");
const app = express();

const port = 3000;

// app.get(route, callback fn)

const calculateSum = (counter) => {
  let sum = 0;

  for (let i = 1; i <= counter; i++) {
    sum += i;
  }

  return sum;
};

const calculateMultiply = (counter) => {
    let multiply = 0;
  
    for (let i = 1; i <= counter; i++) {
      multiply += i;
    }
  
    return multiply;
  };


app.get("/", (req, res) => {
  // query parameters
  const counter = req.query.count
  const result = calculateSum(counter)
  res.send(`The sum is : ${result}`);
});

app.get("/multiply", (req, res) => {
    const result = calculateMultiply(5)
    res.send(`The multiply is : ${result}`);
  });

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
