//External Module
const express = require("express");
const cors = require("cors");

const app = express();

//Local Module
require("./db/config");
const users = require("./db/user.js");

//
app.use(express.json());
app.use(cors());

//Application base Midellware
app.post("/data", async (req, res) => {
  try {
    const userData = await new users(req.body);
    const result = await userData.save();
    res.send(result);
  } catch (error) {
    console.log("post error", error);
  }
});

app.get("/data", async (req, res) => {
  const result = await users.find();
  res.send(result);
});

app.delete("/data/:id", async (req, res) => {
  const Data = await users.findByIdAndDelete(req.params.id);
  res.send(Data);
});

app.get("/data/:id", async (req, res) => {
  const result = await users.findOne({ _id: req.params.id });
  if (result) {
    res.send(result);
  } else {
    res.send({ result: "no" });
  }
});

app.put("/data/:id", async (req, res) => {
  const result = await users.updateOne(
    {
      _id: req.params.id,
    },
    {
      $set: req.body,
    },
  );
  res.send(result);
});

const port = 4000;

app.listen(port, () => {
  console.log(`http://localhost:${port}`);
});
