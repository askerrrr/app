import JWT from "jsonwebtoken";
import env from "../env_var.js";
import { Router } from "express";
import db from "./services/database/db.js";
import downloadAndSaveFile from "./services/different/downloadAndSaveFile.js";

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

    var existingDocument = await collection.findOne({
      userId: user.userId,
    });

    if (!existingDocument) {
      await collection.insertOne(user);
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

    var existingDocument = await collection.findOne({ userId });

    if (!existingDocument) await db.createNewUser(collection, order);

    await db.addNewOrder(collection, order);
    await downloadAndSaveFile(userId, orderId, fileUrl, order);

    return res.sendStatus(200);
  } catch (err) {
    if (err.name === "JsonWebTokenError") return res.sendStatus(401);

    console.log(err);
    return res.sendStatus(500);
  }
});

router.get("/api/status/:userId", async (req, res) => {
  // var authHeader = req.headers.authorization;

  // if (!authHeader) return res.sendStatus(401);

  // var token = authHeader.split(" ")[1];

  // if (!token) return res.sendStatus(401);

  try {
    // var validToken = JWT.verify(token, env.bot_secret_key);

    //if (!validToken) return res.sendStatus(401);

    var userId = req.params.userId;
    var collection = req.app.locals.collection;

    var user = await collection.findOne({ userId });
    var arr = [];

    for (var i = 0; i < user.orders.length; i++) {
      arr.push({
        userid: user.userId,
        date: user.orders[i].order.date,
        orderid: user.orders[i].order.id,
        phone: user.orders[i].order.phone,
        status: user.orders[i].order.orderStatus,
      });
    }

    var activeOrders = arr.filter(
      (order) => order.status !== "order-is-completed:6"
    );
    var completedOrders = arr.filter(
      (order) => order.status === "order-is-completed:6"
    );
    return user
      ? res.status(200).json({ activeOrders, completedOrders })
      : res.sendStatus(404);
  } catch (err) {
    console.log(err);
    return res.sendStatus(500);
  }
});

// router.get("/api/status/:userId/:orderId", async (req, res) => {
//   var authHeader = req.headers.authorization;

//   if (!authHeader) return res.sendStatus(401);

//   var token = authHeader.split(" ")[1];

//   if (!token) return res.sendStatus(401);

//   try {
//     var validToken = JWT.verify(token, env.bot_secret_key);

//     if (!validToken) return res.sendStatus(401);

//     var userId = req.params.userId;
//     var orderId = req.params.orderId;
//     var collection = req.app.locals.collection;

//     var user = await collection.findOne({ userId });

//     var result = user.orders.find((item) => item.order.id === orderId);
//     var status = result.order.orderStatus;

//     return user ? res.json({ userId, orderId, status }) : res.sendStatus(404);
//   } catch (err) {
//     console.log(err);
//     return res.sendStatus(500);
//   }
// });

export { router as botApi };
