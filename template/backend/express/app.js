import express from "express";
import cors from "cors";
const app = express();
const port = 3000;

app.use(express.json()); 
app.use(express.urlencoded({ extended: true })); 
app.use(cors())

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/user/:id", (req, res) => {
  res.json({
    userId: req.params.id,
    query: req.query,
  });
});

app.post("/api/data", (req, res) => {
  console.log("Received data:", req.body);
  res.status(201).send("Data received");
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

export default app;