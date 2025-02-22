import { Router } from "express";
import db from "../database/db.js";

var router = Router({ caseSensitive: true, strict: true });

router.patch("/", async (req, res) => {
  var userId = req.body.userId;
  var orderId = req.body.orderId;
  var item = req.body.item;
  var itemStatus = req.app.locals.itemStatus;

  await db.updateItemStatus(userId, orderId, item, itemStatus);
  return res.sendStatus(200);
});

router.get("/:userId/:orderId", async (req, res) => {
  var userId = req.params.userId;
  var orderId = req.params.orderId;
  var collection = req.app.locals.collection;

  var user = await collection.findOne({ userId });

  var result = user.orders.find((item) => item.order.id === orderId);
  var status = result.order.orderStatus;

  return user ? res.json(status) : res.sendStatus(404);
});

export { router as itemStatus };
