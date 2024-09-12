const express = require("express");
const router = express.Router();
const { env } = require("../env_var");
const path = require("path");

router.use(express.json());

router.post("/", async (req, res) => {
  const collection = req.app.locals.userAndOrders;
  const authHeader = req.headers.authorization;
  const authToken = env.auth_token;
  const userOrder = req.body;
  const userOrderId = userOrder.tgId;

  const existingDocument = await collection.findOne({
    tgId: userOrderId,
  });

  try {
    if (authHeader && authHeader.split(" ")[1] === `${authToken}`) {
      if (existingDocument) {
        await collection.updateOne(
          { tgId: userOrderId },
          { $push: { orders: { userOrder } } }
        );

        return res.status(201).send(existingDocument);
      }
    } else if (!authHeader) {
      return res.sendStatus(401);
    }
  } catch {
    res.sendStatus(500);
  }
});

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
  } catch {
    return res.status(500);
  }
});

module.exports = router;
