const express = require("express");
const router = express.Router();

router.use(express.json());

router.get("/:tgId", async (req, res) => {
  try {
    const tgId = Number(req.params.tgId);

    const collection = req.app.locals.collection;
    const userInfo = await collection.findOne({ tgId: tgId });
    if (userInfo) {
      res.json(userInfo);
    } else {
      res.sendStatus(404);
    }

    // const userAndOrders = req.app.locals.userAndOrders;
    // const userOrders = req.body;
  } catch {
    return res.status(500);
  }
});

module.exports = router;
