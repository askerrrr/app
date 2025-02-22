import JWT from "jsonwebtoken";
import env from "../env_var.js";
import { Router } from "express";
import db from "../database/db.js";
import getDataFromXLSX from "./services/getDataFromXLSX.js";
import downloadAndSaveFile from "./services/downloadAndSaveFile.js";
import getOrderDetailsForBot from "./services/getOrderDetailsForBot.js";

var router = Router({ caseSensitive: true, strict: true });

router.post("/api/users", async (req, res) => {
  var authHeader = req.headers.authorization;

  try {
    if (!authHeader) return res.status(401);

    var token = authHeader.split(" ")[1];

    if (!token) return res.status(401);

    var validToken = JWT.verify(token, env.bot_secret_key);

    if (!validToken) return res.sendStatus(401);

    var user = req.body;
    var collection = req.app.locals.collection;
    var itemStatus = req.app.locals.itemStatus;

    var existingDocument = await collection.findOne({
      userId: user.userId,
    });

    if (!existingDocument) {
      await collection.insertOne(user);
      await db.createItemStatusCollection(user, itemStatus);

      return res.sendStatus(200);
    }

    return res.sendStatus(409);
  } catch (err) {
    if (err.name === "JsonWebTokenError") {
      return res.sendStatus(401);
    }

    console.log(err);
    return res.sendStatus(500);
  }
});

router.post("/api/order", async (req, res) => {
  try {
    var authHeader = req.headers.authorization;

    if (!authHeader) return res.sendStatus(401);

    var token = authHeader.split(" ")[1];

    if (!token) return res.sendStatus(401);

    var validToken = JWT.verify(token, env.bot_secret_key);

    if (!validToken) return res.sendStatus(401);

    var order = req.body;
    var userId = order.userId;
    var orderId = order.id;
    var fileUrl = order.file.telegramApiFileUrl;
    var collection = req.app.locals.collection;
    var itemStatus = req.app.locals.itemStatus;

    var existingDocument = await collection.findOne({ userId });

    if (!existingDocument) {
      await db.createNewUser(order, collection);
      await db.createItemStatusCollection(order, itemStatus);
    }

    await db.addNewOrder(collection, order);
    await downloadAndSaveFile(userId, orderId, fileUrl, order);

    if (order.type == "multiple") {
      var filePath = order.file.path;
      var xlsxData = await getDataFromXLSX(filePath);
      await db.addItems(userId, orderId, xlsxData, itemStatus);
    }

    return res.sendStatus(200);
  } catch (err) {
    if (err.name === "JsonWebTokenError") return res.sendStatus(401);

    console.log(err);
    return res.sendStatus(500);
  }
});

router.get("/api/status/:userId", async (req, res) => {
  var authHeader = req.headers.authorization;

  if (!authHeader) return res.sendStatus(401);

  var token = authHeader.split(" ")[1];

  if (!token) return res.sendStatus(401);

  try {
    var validToken = JWT.verify(token, env.bot_secret_key);

    if (!validToken) return res.sendStatus(401);

    var userId = req.params.userId;
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
    console.log(err);
    return res.sendStatus(500);
  }
});

export { router as botApi };
