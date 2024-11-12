import JWT from "jsonwebtoken";
import env from "../env_var.js";
import { Router } from "express";
import db from "./services/database/db.js";
import downloadAndSaveFile from "./services/different/downloadAndSaveFile.js";

const router = Router({ caseSensitive: true, strict: true });

router.post("/api/users", async (req, res) => {
  const collection = req.app.locals.collection;
  const authHeader = req.headers.authorization;

  if (!authHeader) return res.status(401);

  const token = authHeader.split(" ")[1];

  if (!token) return res.status(401);

  const user = req.body;
  const existingDocument = await collection.findOne({
    userId: user.userId,
  });

  try {
    const validToken = JWT.verify(token, env.bot_secret_key);

    if (validToken) {z
      if (!existingDocument) {
        await collection.insertOne(user);

        return res.status(200).json({ msg: "successfully" });
      } else if (existingDocument) {
        return res.sendStatus(409);
      }
    } else {
      return res.sendStatus(401).json({ error: "Invalid Token" });
    }
  } catch (err) {
    if (err.name === "JsonWebTokenError") {
      return res.status(401).json({ error: "Invalid token" });
    }

    console.log(err);
    return res.sendStatus(500);
  }
});

router.post("/api/order", async (req, res) => {
  try {
    const collection = req.app.locals.collection;
    const authHeader = req.headers.authorization;

    if (!authHeader) return res.status(401);

    const token = authHeader.split(" ")[1];

    if (!token) return res.status(401);

    const order = req.body;
    const userId = order.userId;
    const fileUrl = order.file.url;
    const fileId = order.file.id;

    const validToken = JWT.verify(token, env.bot_secret_key);

    const existingDocument = await collection.findOne({
      userId,
    });

    if (validToken) {
      if (existingDocument) {
        await db.addNewOrder(collection, order);
        await downloadAndSaveFile(userId, fileId, fileUrl);

        return res.sendStatus(200);
      } else {
        const newUser = await db.createNewUser(collection, order);

        if (newUser) {
          await db.addNewOrder(collection, order);

          return res
            .status(200)
            .json({ msg: "the order was created successfully" });
        }
      }
    } else {
      return res.sendStatus(401);
    }
  } catch (err) {
    if (err.name === "JsonWebTokenError")
      return res.status(401).json({ error: "Invalid token" });

    console.log(err);
    return res.status(500);
  }
});

router.get("/api/status/:userId/:fileId", async (req, res) => {
  const userId = req.params.userId;
  const fileId = req.params.fileId;
  const collection = req.app.locals.collection;
  const authHeader = req.headers.authorization;

  if (!authHeader) return res.status(401);

  const token = authHeader.split(" ")[1];

  if (!token) return res.status(401);

  try {
    const validToken = JWT.verify(token, env.bot_secret_key);

    if (validToken) {
      const user = await collection.findOne({
        userId,
        "orders.order.file.id": fileId,
      });

      const result = user.orders.find((item) => item.order.file.id === fileId);
      const status = result.order.file.status;

      return user ? res.json({ status }) : res.sendStatus(404);
    }

    return res.sendStatus(401);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
});

export { router as botApi };
