import env from "../../env_var.js";
import db from "../../database/db.js";
import { fileURLToPath } from "url";
import { dirname, join } from "path";
import { Router, json } from "express";
import deleteUserDir from "./services/deleteUserDir.js";
import deleteOrderFile from "./services/deleteOrderFile.js";

var router = Router({ caseSensitive: true, strict: true });
var __dirname = dirname(fileURLToPath(import.meta.url));

router.use(json());

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

router.get("/api/order/:orderId", async (req, res) => {
  try {
    var orderId = req.params.orderId;
    var collection = req.app.locals.collection;

    var user = await collection.findOne({
      "orders.order.id": orderId,
    });

    var order = user.orders.find((item) => item.order.id === orderId);

    return order ? res.json(order) : res.sendStatus(404);
  } catch {
    return res.sendStatus(500);
  }
});

router.get("/orders/order/:orderId", async (_, res) => {
  try {
    return res.sendFile(join(__dirname, "../public", "html", "userOrder.html"));
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
});

router.get("/orders/:userId", async (req, res) => {
  try {
    var userId = req.params.userId;
    var collection = req.app.locals.collection;

    var existingDocument = await collection.findOne({ userId });

    if (existingDocument.orders.length > 0)
      return res.sendFile(
        join(__dirname, "../public", "html", "ordersList.html")
      );

    return res.sendFile(join(__dirname, "../public", "html", "noOrders.html"));
  } catch (err) {
    console.log(err);
    return res.sendStatus(500);
  }
});

router.delete("/api/delete/:userId", async (req, res) => {
  var userId = req.params.userId;
  var collection = req.app.locals.collection;

  try {
    await db.deleteUser(userId, collection);
    await deleteUserDir(userId);

    return res.sendStatus(200);
  } catch (err) {
    console.log(err);
    return res.sendStatus(500);
  }
});

router.delete("/api/delete/:userId/:orderId", async (req, res) => {
  var userId = req.params.userId;
  var orderId = req.params.orderId;
  var collection = req.app.locals.collection;

  try {
    await deleteOrderFile(userId, orderId, collection);
    await db.deleteOrder(userId, orderId, collection);

    var botResponse = await fetch(env.bot_server_ip, {
      method: "DELETE",
      body: JSON.stringify({ userId, orderId }),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${env.bearer_token}`,
      },
    });

    if (!botResponse.ok) throw new Error(`${botResponse.statusText}`);

    return res.sendStatus(200);
  } catch (err) {
    console.log(err);
    return res.sendStatus(500);
  }
});

export { router as userPath };
