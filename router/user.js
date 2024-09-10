const express = require("express");
const router = express.Router();

router.use(express.json());

router.get("/", async (req, res) => {
  res.send("Routing");
});

router.get("/orderinfo/:tgId", async (req, res) => {
  try {
    const tgId = req.params.tgId;
    const collection = req.app.locals.collection;
    const userInfo = await collection.findOne({ tgId: tgId });
    if (userInfo) {
      res.json({ name: "asker" });
    } else {
      res.sendStatus(404);
    }

    // const userAndOrders = req.app.locals.userAndOrders;
    // const userOrders = req.body;
  } catch {
    return res.status(500);
  }
});

router.get("/orderinfo", async (req, res) => {
  res.send("order");
});

module.exports = router;
