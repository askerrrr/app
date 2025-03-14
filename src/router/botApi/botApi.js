import { Router } from "express";
import logger from "../../logger.js";
import db from "../../database/db.js";
import validateAuthHeader from "./services/validateAuthHeader.js";
import getDataFromXLSX from "../xlsx/services/getDataFromXLSX.js";
import downloadAndSaveFile from "./services/downloadAndSaveFile.js";
import getOrderDetailsForBot from "./services/getOrderDetailsForBot.js";

var router = Router({ caseSensitive: true, strict: true });

router.post("/api/users", async (req, res) => {
  var authHeader = req.headers?.authorization;

  try {
    var validAuthHeader = await validateAuthHeader(authHeader);

    if (!validAuthHeader) {
      res.sendStatus(401);
      return;
    }

    var user = req.body;
    var collection = req.app.locals.collection;
    var itemCollection = req.app.locals.itemCollection;

    var existingDocument = await collection.findOne({
      userId: user.userId,
    });

    if (!existingDocument) {
      await collection.insertOne(user);
      await db.createItemCollection(user, itemCollection);

      return res.sendStatus(200);
    }

    return res.sendStatus(409);
  } catch (err) {
    if (err.name === "JsonWebTokenError") {
      return res.sendStatus(401);
    }
    logger.error({ place: "getting users from a bot", userId, err });
    res.status(500);
  }
});

router.post("/api/order", async (req, res) => {
  var authHeader = req.headers?.authorization;
  try {
    var validAuthHeader = await validateAuthHeader(authHeader);

    if (!validAuthHeader) {
      return res.sendStatus(401);
    }

    var order = req.body;

    var { userId, id, file } = order;

    var fileUrl = file.telegramApiFileUrl;

    var collection = req.app.locals.collection;
    var itemCollection = req.app.locals.itemCollection;

    var existingDocument = await collection.findOne({ userId });

    if (!existingDocument) {
      await db.createNewUser(order, collection);
      await db.createItemCollection(order, itemCollection);
    }

    await db.addNewOrder(collection, order);
    await downloadAndSaveFile(userId, id, fileUrl, order);

    if (order.type == "multiple") {
      var filePath = file.path;
      var xlsxData = await getDataFromXLSX(filePath);
      await db.addItems(userId, id, xlsxData, itemCollection);
    }

    return res.sendStatus(200);
  } catch (err) {
    if (err.name === "JsonWebTokenError") {
      return res.sendStatus(401);
    }
    logger.error({ place: "getting orders from a bot", userId, err });
    res.status(500);
  }
});

router.get("/api/status/:userId", async (req, res) => {
  var authHeader = req.headers?.authorization;

  try {
    var validAuthHeader = await validateAuthHeader(authHeader);

    if (!validAuthHeader) {
      return res.sendStatus(401);
    }

    var { userId } = req.params;
    var collection = req.app.locals.collection;

    var orders = await collection.findOne({ userId });
    var orderDetailsForBot = await getOrderDetailsForBot(orders);

    var activeOrders = orderDetailsForBot.filter(
      (order) => order.status !== "order-is-completed:6"
    );
    var completedOrders = orderDetailsForBot.filter(
      (order) => order.status === "order-is-completed:6"
    );
    return orders
      ? res.status(200).json({ activeOrders, completedOrders })
      : res.sendStatus(404);
  } catch (err) {
    logger.error({ place: "sending orders to the bot", userId, err });
    res.status(500);
  }
});

export { router as botApi };
