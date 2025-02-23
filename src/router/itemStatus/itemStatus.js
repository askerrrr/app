import { Router } from "express";
import db from "../../database/db.js";
import allItemsArePurchased from "./services/allItemsArePurchased.js";
import sendOrderStatusUpdate from "./services/sendOrderStatusUpdate.js";

var router = Router({ caseSensitive: true, strict: true });

router.patch("/", async (req, res) => {
  var userId = req.body.userId;
  var orderId = req.body.orderId;
  var item = req.body.item;
  var itemStatus = req.app.locals.itemStatus;
  var ordersCollection = req.app.locals.collection;

  await db.updateItemStatus(userId, orderId, item, itemStatus);

  var isAllItemsArePurchased = await allItemsArePurchased(
    userId,
    orderId,
    itemStatus
  );

  if (isAllItemsArePurchased) {
    var currentOrderStatus = await db.getCurrentOrderStatus(
      userId,
      orderId,
      ordersCollection
    );

    if (currentOrderStatus == "in-processing:1") {
      await db.updateOrderStatus(
        userId,
        orderId,
        "purchased:2",
        ordersCollection
      );

      var isStatusUpdated = await sendOrderStatusUpdate(
        userId,
        orderId,
        "purchased:2"
      );

      if (!isStatusUpdated) return;
    }
  }

  return res.sendStatus(200);
});

router.get("/:userId/:orderId", async (req, res) => {
  var userId = req.params.userId;
  var orderId = req.params.orderId;
  var ordersCollection = req.app.locals.collection;

  var document = await ordersCollection.findOne({ userId });

  var result = document.orders.find((item) => item.order.id === orderId);
  var status = result.order.orderStatus;

  return document ? res.json(status) : res.sendStatus(404);
});

export { router as itemStatus };
