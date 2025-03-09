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
    var userId = req.params.userId;
    var collection = req.app.locals.collection;
    var user = await collection.findOne({ userId });

    return user ? res.json(user) : res.sendStatus(404);
  } catch {
    return res.sendStatus(500);
  }
});

router.get("/api/order/:userId/:orderId", async (req, res) => {
  try {
    var userId = req.param.userId;
    var orderId = req.params.orderId;
    var collection = req.app.locals.collection;

    var user = await collection.findOne(userId);

    var order = user.orders.find((item) => item.order.id === orderId);

    return order ? res.json(order) : res.sendStatus(404);
  } catch {
    return res.sendStatus(500);
  }
});

router.get("/orders/order/:userId/:orderId", async (_, res) => {
  try {
    res.sendFile(
      join(__dirname, "..", "..", "public", "html", "userOrder.html")
    );
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
});

router.get("/orders/:userId", async (req, res) => {
  try {
    var userId = req.params.userId;
    var collection = req.app.locals.collection;

    var user = await collection.findOne({ userId });

    return user.orders.length
      ? res.sendFile(
          join(__dirname, "..", "..", "public", "html", "ordersList.html")
        )
      : res.sendFile(
          join(__dirname, "..", "..", "public", "html", "noOrders.html")
        );
  } catch (err) {
    console.log(err);
    return res.sendStatus(500);
  }
});

router.delete("/api/delete/:userId", async (req, res) => {
  var userId = req.params.userId;
  var collection = req.app.locals.collection;

  var successfulResponse = await sendDeleteUserRequest(userId);

  if (successfulResponse) {
    var isDeletedFromDB = await db.deleteUser(userId, collection);

    if (isDeletedFromDB) {
      var isUserFolderDeleted = await deleteUserFolder(userId);

      return isUserFolderDeleted ? res.sendStatus(200) : res.sendStatus(304);
    }
  } else {
    res.sendStatus(304);
  }
});

router.delete("/api/delete/:userId/:orderId", async (req, res) => {
  var userId = req.params.userId;
  var orderId = req.params.orderId;
  var collection = req.app.locals.collection;

  try {
    var successfulResponse = await sendDeleteOrderRequest(userId, orderId);

    if (successfulResponse) {
      var isFileDeleted = await deleteOrderFile(userId, orderId, collection);
      var isDeletedFromDB = await db.deleteOrder(userId, orderId, collection);

      return isFileDeleted && isDeletedFromDB
        ? res.sendStatus(200)
        : res.sendStatus(304);
    } else {
      res.sendStatus(304);
    }
  } catch (err) {
    console.log("errMessage: ", err);
  }
});

export { router as userPath };
