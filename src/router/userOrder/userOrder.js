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

    var order = user.orders.find((item) => item.order.id === orderId);

    return order ? res.json(order) : res.sendStatus(404);
  } catch {
    res.status(500).json({ err });
  }
});

router.get("/orders/order/:userId/:orderId", async (_, res) => {
  try {
    res.sendFile(
      join(__dirname, "..", "..", "public", "html", "userOrder.html")
    );
  } catch (err) {
    res.status(500).json({ err });
  }
});

router.get("/orders/:userId", async (req, res) => {
  try {
    var { userId } = req.params;
    var collection = req.app.locals.collection;

    var user = await collection.findOne({ userId });

    return user.orders.length
      ? res.sendFile(
          join(__dirname, "..", "..", "public", "html", "ordersList.html")
        )
      : res.sendFile(
          join(__dirname, "..", "..", "public", "html", "noActiveOrders.html")
        );
  } catch (err) {
    res.status(500).json({ err });
  }
});

router.delete("/api/delete/:userId", async (req, res) => {
  try {
    var { userId } = req.params;
    var collection = req.app.locals.collection;

    var responseStatus = await sendDeleteUserRequest(userId);

    if (responseStatus == 200) {
      var isDeletedFromDB = await db.deleteUser(userId, collection);

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

  try {
    var responseStatus = await sendDeleteOrderRequest(userId, orderId);

    if (responseStatus == 200) {
      var isFileDeleted = await deleteOrderFile(userId, orderId, collection);
      var isDeletedFromDB = await db.deleteOrder(userId, orderId, collection);

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

export { router as userPath };
