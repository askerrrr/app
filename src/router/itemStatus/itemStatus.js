import { Router } from "express";
import db from "../../database/db.js";
import allItemsArePurchased from "./services/allItemsArePurchased.js";
import sendOrderStatusUpdate from "./services/sendOrderStatusUpdate.js";

var router = Router({ caseSensitive: true, strict: true });

router.patch("/", async (req, res) => {
  var { userId, orderId, item } = req.body;

  var itemCollection = req.app.locals.itemCollection;
  var ordersCollection = req.app.locals.collection;

  await db.updateItemStatus(userId, orderId, item, itemCollection);

  var isAllItemsArePurchased = await allItemsArePurchased(
    userId,
    orderId,
    itemCollection
  );

  await db.getCurrentOrderStatus(userId, orderId, ordersCollection);
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
  var { userId, orderId } = req.params;

  var ordersCollection = req.app.locals.collection;

  var document = await ordersCollection.findOne({ userId });

  if (!document) res.sendStatus(404);

  var result = document.orders.find((item) => item.order.id === orderId);

  if (!result) res.sendStatus(404);

  var status = result.order.orderStatus;

  return res.json(status);
});

export { router as itemStatus };
