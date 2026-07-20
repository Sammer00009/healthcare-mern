const express = require("express");
const router = express.Router();
const { careInfo, disclaimer } = require("../config/careInfo");

// GET /api/care-info -> all categories with general tips
router.get("/", (req, res) => {
  res.json({ careInfo, disclaimer });
});

// GET /api/care-info/:category -> tips for one category
router.get("/:category", (req, res) => {
  const info = careInfo[req.params.category];
  if (!info) return res.status(404).json({ message: "Category not found" });
  res.json({ category: req.params.category, ...info, disclaimer });
});

module.exports = router;
