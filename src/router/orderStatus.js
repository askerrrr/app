import env from "../env_var.js";
import { Router } from "express";
import db from "../database/db.js";
import sendOrderStatusUpdate from "./services/sendOrderStatusUpdate.js";

var router = Router({ caseSensitive: true, strict: true });

router.get("/api/:userId/:orderId", async (req, res) => {
  try {
    var userId = req.params.userId;
    var orderId = req.params.orderId;
    var collection = req.app.locals.collection;

    var user = await collection.findOne({ userId });

    var result = user.orders.find((item) => item.order.id === orderId);
    var status = result.order.orderStatus;

    return user ? res.json(status) : res.sendStatus(404);
  } catch (err) {
    console.log(err);
    return res.sendStatus(500);
  }
});

router.patch("/:userId/:orderId/:status", async (req, res) => {
  try {
    var collection = req.app.locals.collection;
    var userId = req.params.userId;
    var orderId = req.params.orderId;
    var status = req.params.status;

    let [statusValue, statusId] = status.split(":");

    statusId = statusId.split("").reverse()[0];

    var orderStatus = `${statusValue}:${statusId}`;

    var existingDocument = await collection.findOne({ userId });

    if (!existingDocument) return res.sendStatus(404);

    var isStatusUpdated = await sendOrderStatusUpdate(
      userId,
      orderId,
      orderStatus
    );

    if (!isStatusUpdated) return;

    await db.updateOrderStatus(userId, orderId, orderStatus, collection);
    return res.sendStatus(200);
  } catch (err) {
    if (err.message === "fetch failed") return res.sendStatus(500);
  }
});

export { router as orderStatus };
