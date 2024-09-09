const express = require("express");
const router = express.Router();

router.use(express.json());

router.get("/", async (req, res) => {
  res.send("Routing");
});

router.post("/order", async (req, res) => {
  try {
    const userAndOrders = req.app.locals.userAndOrders;
    const userOrders = req.body;
    
  } catch {
    return res.status(500);
  }
});

router.get("/order", async (req, res) => {
  res.send("order");
});

module.exports = router;
