import JWT from "jsonwebtoken";
import env from "../env_var.js";
import { Router } from "express";
import db from "./services/database/db.js";
import downloadAndSaveFile from "./services/different/downloadAndSaveFile.js";

const router = Router({ caseSensitive: true, strict: true });

router.post("/api/users", async (req, res) => {
  const authHeader = req.headers.authorization;

  try {
    if (!authHeader) return res.status(401);

    const token = authHeader.split(" ")[1];

    if (!token) return res.status(401);

    const validToken = JWT.verify(token, env.bot_secret_key);

    if (!validToken) return res.sendStatus(401);

    const user = req.body;
    const collection = req.app.locals.collection;

    const existingDocument = await collection.findOne({
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
    const authHeader = req.headers.authorization;

    if (!authHeader) return res.sendStatus(401);

    const token = authHeader.split(" ")[1];

    if (!token) return res.sendStatus(401);

    const validToken = JWT.verify(token, env.bot_secret_key);

    if (!validToken) return res.sendStatus(401);

    const order = req.body;
    const userId = order.userId;
    const orderId = order.id;
    const fileUrl = order.file.telegramApiFileUrl;
    const collection = req.app.locals.collection;

    const existingDocument = await collection.findOne({ userId });

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

router.get("/api/status/:userId/:orderId", async (req, res) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) return res.sendStatus(401);

  const token = authHeader.split(" ")[1];

  if (!token) return res.sendStatus(401);

  try {
    const validToken = JWT.verify(token, env.bot_secret_key);

    if (!validToken) return res.sendStatus(401);

    const userId = req.params.userId;
    const orderId = req.params.orderId;
    const collection = req.app.locals.collection;

    const user = await collection.findOne({ userId });

    const result = user.orders.find((item) => item.order.id === orderId);
    const status = result.order.orderStatus;

    return user ? res.json({ userId, orderId, status }) : res.sendStatus(404);
  } catch (err) {
    console.log(err);
    return res.sendStatus(500);
  }
});

export { router as botApi };
