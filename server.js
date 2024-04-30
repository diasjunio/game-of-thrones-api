const express = require("express");
const fetch = require("cross-fetch");

const app = express();
const PORT = process.env.PORT || 3000;

app.get("/characters", async (req, res) => {
  try {
    const response = await fetch("https://thronesapi.com/api/v2/Characters");
    const data = await response.json();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

app.get("/characters/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const characterId = parseInt(id);
    if (characterId < 0 || characterId > 52) {
      res
        .status(400)
        .json({ error: "Invalid character ID. Must be between 0 and 52." });
    } else {
      const response = await fetch(
        `https://thronesapi.com/api/v2/Characters/${id}`,
      );
      const data = await response.json();
      res.json(data);
    }
  } catch (error) {
    if (error.response && error.response.status === 404) {
      res.status(404).json({ error: "Character not found" });
    } else {
      res.status(500).json({ error: "Internal server error" });
    }
  }
});

module.exports = app;
