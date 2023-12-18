import express from "express";

const app = express();

app.use("/", (req, res) => {
  res.json("Hello World");
});

app.listen(8000, () => {
  console.log("Server running on port 8000");
});
