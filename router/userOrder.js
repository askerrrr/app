import JWT from "jsonwebtoken";
import env from "../env_var.js";
import { fileURLToPath } from "url";
import { dirname, join } from "path";
import { Router, json } from "express";
import db from "./services/database/db.js";
import deleteUserDir from "./services/different/deleteUserDir.js";
import deleteOrderFile from "./services/different/deleteOrderFile.js";
import downloadAndSaveFile from "./services/different/downloadAndSaveFile.js";

const router = Router({ caseSensitive: true, strict: true });
const __dirname = dirname(fileURLToPath(import.meta.url));

router.use(json());

router.get("/api/:userId", async (req, res) => {
  try {
    const userId = req.params.userId;
    const collection = req.app.locals.collection;
    const user = await collection.findOne({ userId: userId });

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
      "orders.order.file.id": orderId,
    });

    const order = user.orders.find((order) => order.order.file.id === orderId);

    return order ? res.json(order) : res.sendStatus(404);
  } catch {
    return res.sendStatus(500);
  }
});

router.get("/orders/order/:orderId", async (_, res) => {
  try {
    res.sendFile(join(__dirname, "../public", "html", "userOrder.html"));
  } catch (err) {
    console.log(err);
    return res.sendStatus(500);
  }
});

router.get("/orders/:userId", async (_, res) => {
  try {
    res.sendFile(join(__dirname, "../public", "html", "ordersList.html"));
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
});

router.delete("/api/delete/:userId", async (req, res) => {
  try {
    const userId = req.params.userId;
    const collection = req.app.locals.collection;

    const existingDocument = await collection.findOne({ userId });

    if (existingDocument) {
      await deleteUserDir(userId);
      await db.deleteUser(userId, collection);

      return res.sendStatus(200);
    }
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
});

router.delete("/api/delete/:userId/:orderId", async (req, res) => {
  try {
    const userId = req.params.userId;
    const orderId = req.params.orderId;
    const collection = req.app.locals.collection;

    const existingDocument = await collection.findOne({
      userId,
      "orders.order.file.id": orderId,
    });

    if (existingDocument) {
      await db.deleteOrder(userId, orderId, collection);

      await deleteOrderFile(userId, orderId);

      return res.sendStatus(200);
    }
  } catch (err) {
    console.log(err);
    return res.sendStatus(500);
  }
});

export { router as userPath };
