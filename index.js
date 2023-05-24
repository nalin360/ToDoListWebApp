// Backend (Node.js and Express)
const express = require("express");
const cors = require("cors");
const app = express();
const fs = require("fs");

app.use(cors());
app.use(express.json());

app.post("/update", (req, res) => {
  const newTask = req.body;
  let data = JSON.parse(fs.readFileSync("data.json"));
  data.push(newTask);
  fs.writeFileSync("data.json", JSON.stringify(data));
  res.send("Data updated successfully");
});

app.post("/complete", (req, res) => {
  const { taskId } = req.body;
  let data = JSON.parse(fs.readFileSync("data.json"));
  data = data.map((task) => {
    if (task.taskId === taskId) {
      return { ...task, completion: true };
    }
    return task;
  });
  fs.writeFileSync("data.json", JSON.stringify(data));
  res.send("Task completed successfully");
});

app.delete("/delete/:taskId", (req, res) => {
  const { taskId } = req.params;
  let data = JSON.parse(fs.readFileSync("data.json"));

  data = data.filter((task) => task.taskId !== taskId);
  
  fs.writeFileSync("data.json", JSON.stringify(data));
  res.send("Task deleted successfully");
});

app.get("/data", (req, res) => {
  const data = JSON.parse(fs.readFileSync("data.json"));
  res.send(data);
});

app.listen(5000, () => console.log("Server started"));
