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

  try {
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

    res.sendStatus(200);
  } catch (err) {
    res.status(500).json({ err });
  }
});

router.get("/:userId/:orderId", async (req, res) => {
  var { userId, orderId } = req.params;

  var ordersCollection = req.app.locals.collection;

  try {
    var document = await ordersCollection.findOne({ userId });

    if (!document) res.sendStatus(404);

    var result = document.orders.find((item) => item.order.id === orderId);

    if (!result) res.sendStatus(404);

    var status = result.order.orderStatus;

    res.json(status);
  } catch (err) {
    res.status(500).json({ err });
  }
});

export { router as itemStatus };
