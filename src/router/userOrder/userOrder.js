import { Router } from "express";
import { fileURLToPath } from "url";
import { dirname, join } from "path";
import db from "../../database/db.js";
import deleteOrderFile from "./services/deleteOrderFile.js";
import deleteUserFolder from "./services/deleteUserFolder.js";
import sendDeleteUserRequest from "./services/sendDeleteUserRequest.js";
import sendDeleteOrderRequest from "./services/sendDeleteOrderRequest.js";

var router = Router({ caseSensitive: true, strict: true });
var __dirname = dirname(fileURLToPath(import.meta.url));

router.get("/api/:userId", async (req, res) => {
  try {
    var { userId } = req.params;

    var collection = req.app.locals.collection;
    var user = await collection.findOne({ userId });

    return user ? res.json(user) : res.sendStatus(404);
  } catch (err) {
    res.status(500).json({ err });
  }
});

router.get("/api/order/:userId/:orderId", async (req, res) => {
  try {
    var { userId, orderId } = req.params;

    var collection = req.app.locals.collection;

    var user = await collection.findOne({ userId });

    var order = user.orders.find((e) => e.order.id === orderId);

    return order ? res.json(order) : res.sendStatus(404);
  } catch (err) {
    res.status(500).json({ err });
  }
});

router.get("/orders/order/:userId/:orderId", async (_, res) => {
  try {
    res.sendFile(join(__dirname, "../../public/html/userOrder.html"));
  } catch (err) {
    res.status(500).json({ err });
  }
});

router.get("/orders/:userId", async (req, res) => {
  try {
    var { userId } = req.params;
    var collection = req.app.locals.collection;

    var activeOrders = await db.getActiveOrders(userId, collection);
    var completedOrders = await db.getCompletedOrders(userId, collection);

    var active = join(__dirname, "../../public/html/activeOrders.html");
    var completed = join(__dirname, "../../public/html/completedOrders.html");
    var noOrders = join(__dirname, "../../public/html/noOrders.html");

    if (
      activeOrders?.length &&
      (completedOrders?.length || !completedOrders?.length)
    ) {
      res.sendFile(active);
    } else if (!activeOrders?.length && completedOrders?.length) {
      res.sendFile(completed);
    } else if (!activeOrders?.length && !completedOrders?.length) {
      res.sendFile(noOrders);
    }
  } catch (err) {
    res.status(500).json({ err });
  }
});

router.delete("/api/delete/:userId", async (req, res) => {
  try {
    var { userId } = req.params;
    var collection = req.app.locals.collection;
    var itemCollection = req.app.locals.itemCollection;

    var responseStatus = await sendDeleteUserRequest(userId);

    if (responseStatus == 200) {
      var isDeletedFromDB = await db.deleteUser(
        userId,
        collection,
        itemCollection
      );

      if (isDeletedFromDB) {
        var isUserFolderDeleted = await deleteUserFolder(userId);

        return isUserFolderDeleted ? res.sendStatus(200) : res.sendStatus(304);
      } else {
        res.sendStatus(304);
      }
    } else {
      res.sendStatus(responseStatus);
    }
  } catch (err) {
    res.status(500).json({ err });
  }
});

router.delete("/api/delete/:userId/:orderId", async (req, res) => {
  var { userId, orderId } = req.params;

  var collection = req.app.locals.collection;
  var itemCollection = req.app.locals.itemCollection;
  try {
    var responseStatus = await sendDeleteOrderRequest(userId, orderId);

    if (responseStatus == 200) {
      var filePath = await db.findFilePath(userId, orderId, collection);

      var isFileDeleted = await deleteOrderFile(filePath);
      var isDeletedFromDB = await db.deleteOrder(
        userId,
        orderId,
        collection,
        itemCollection
      );

      return isFileDeleted && isDeletedFromDB
        ? res.sendStatus(200)
        : res.sendStatus(304);
    } else {
      res.sendStatus(responseStatus);
    }
  } catch (err) {
    res.status(500).json({ err });
  }
});

router.get("/api/completed/:userId", async (req, res) => {
  var { userId } = req.params;

  var collection = req.app.locals.collection;

  var completedOrders = await db.getCompletedOrders(userId, collection);

  res.json({ userId, completedOrders });
});

export { router as userPath };
