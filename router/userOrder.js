import env from "../env_var.js";
import { fileURLToPath } from "url";
import { dirname, join } from "path";
import { Router, json } from "express";
import db from "./services/database/db.js";
import deleteUserDir from "./services/different/deleteUserDir.js";
import deleteOrderFile from "./services/different/deleteOrderFile.js";

const router = Router({ caseSensitive: true, strict: true });
const __dirname = dirname(fileURLToPath(import.meta.url));

router.use(json());

router.get("/api/:userId", async (req, res) => {
  try {
    const userId = req.params.userId;
    const collection = req.app.locals.collection;
    const user = await collection.findOne({ userId });

    return user ? res.json(user) : res.sendStatus(404);
  } catch {
    return res.sendStatus(500);
  }
});

router.get("/api/order/:orderId", async (req, res) => {
  try {
    const orderId = req.params.orderId;
    const collection = req.app.locals.collection;

    const user = await collection.findOne({
      "orders.order.id": orderId,
    });

    const order = user.orders.find((item) => item.order.id === orderId);

    return order ? res.json(order) : res.sendStatus(404);
  } catch {
    return res.sendStatus(500);
  }
});

router.get("/orders/order/:orderId", async (req, res) => {
  try {
    return res.sendFile(join(__dirname, "../public", "html", "userOrder.html"));
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
});

router.get("/orders/:userId", async (req, res) => {
  try {
    const userId = req.params.userId;
    const collection = req.app.locals.collection;

    const existingDocument = await collection.findOne({ userId });

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
  const userId = req.params.userId;
  const collection = req.app.locals.collection;

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
  const userId = req.params.userId;
  const orderId = req.params.orderId;
  const collection = req.app.locals.collection;

  try {
    await deleteOrderFile(userId, orderId, collection);
    await db.deleteOrder(userId, orderId, collection);

    const botResponse = await fetch(env.bot_server_ip, {
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
