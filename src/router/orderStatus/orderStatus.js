import { Router } from "express";
import db from "../../database/db.js";
import sendOrderStatusUpdate from "../itemStatus/services/sendOrderStatusUpdate.js";

var router = Router({ caseSensitive: true, strict: true });

router.get("/api/:userId/:orderId", async (req, res) => {
  try {
    var { userId, orderId } = req.params;

    var collection = req.app.locals.collection;

    var user = await collection.findOne({ userId });

    var result = user.orders.find((item) => item.order.id === orderId);
    var orderStatus = result.order.orderStatus;

    return user ? res.json({ orderStatus }) : res.sendStatus(404);
  } catch (err) {
    res.status(500).json({ err });
  }
});

router.patch("/:userId/:orderId/:status", async (req, res) => {
  try {
    var { userId, orderId, status } = req.params;

    var collection = req.app.locals.collection;

    let [statusValue, statusId] = status.split(":");

    statusId = statusId.split("").reverse()[0];

    var orderStatus = statusValue + ":" + statusId;

    var document = await collection.findOne({ userId });

    if (!document) return res.sendStatus(404);

    await sendOrderStatusUpdate(userId, orderId, orderStatus);

    await db.updateOrderStatus(userId, orderId, orderStatus, collection);
    return res.sendStatus(200);
  } catch (err) {
    if (err.message === "fetch failed") {
      res.status(500).json({ err });
    }
  }
});

export { router as orderStatus };
