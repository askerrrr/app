const express = require("express");
const router = express.Router();

router.use(express.json());

router.get("/", async (req, res) => {
  res.send("Routing");
});

module.exports = router;
