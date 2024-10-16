import { env } from "../env_var.js";
import { fileURLToPath } from "url";
import { dirname, join } from "path";
import { Router, json } from "express";
import db from "./services/database/db.js";
import { downloadAndSaveFile } from "./services/different/downloadAndSaveFile.js";

const router = Router({ caseSensitive: true, strict: true });
const __dirname = dirname(fileURLToPath(import.meta.url));

router.use(json());

router.post("/", async (req, res) => {
  try {
    const collection = req.app.locals.collection;
    const authHeader = req.headers.authorization;
    const orderContent = req.body;
    const userId = orderContent.userId;
    const fileUrl = orderContent.file.url;
    const fileId = orderContent.file.id;

    const validToken =
      authHeader && authHeader.split(" ")[1] === `${env.auth_token}`;

    const existingDocument = await collection.findOne({
      userId,
    });

    if (validToken) {
      if (existingDocument) {
        await downloadAndSaveFile(userId, fileId, fileUrl);
        await db.addNewOrder(collection, orderContent);

        return res.sendStatus(201);
      } else {
        const newUser = await db.createNewUser(collection, orderContent);
        if (newUser) {
          await db.addNewOrder(collection, orderContent);
          return res.sendStatus(201);
        }
      }
    } else {
      return res.sendStatus(401);
    }
  } catch (err) {
    res.sendStatus(500);
    console.log(err);
  }
});

router.get("/data/:userId", async (req, res) => {
  try {
    const userId = Number(req.params.userId);
    const collection = req.app.locals.collection;
    const user = await collection.findOne({ userId: userId });

    return user ? res.json(user) : res.sendStatus(404);
  } catch {
    return res.status(500);
  }
});

router.get("/data/order/:orderId", async (req, res) => {
  try {
    const orderId = req.params.orderId;
    const collection = req.app.locals.collection;

    const user = await collection.findOne({
      "orders.orderContent.file.id": orderId,
    });

    const order = user.orders.find(
      (order) => order.orderContent.file.id === orderId
    );

    return order ? res.json(order) : res.sendStatus(404);
  } catch {
    return res.status(500);
  }
});

router.get("/orders/order/:orderId", async (_, res) => {
  try {
    res.sendFile(join(__dirname, "../public", "html", "userOrder.html"));
  } catch (err) {
    console.log(err);
    return res.status(500);
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
export { router as userPath };

router.delete("/delete/:userId/:orderId", async (req, res) => {
  try {
    const userId = Number(req.params.userId);
    const orderId = req.params.orderId;
    const collection = req.app.locals.collection;

    const existingDocument = await collection.findOne({
      userId,
      "orders.orderContent.file.id": orderId,
    });

    if (existingDocument) {
      await collection.updateOne(
        {
          userId,
          "orders.orderContent.file.id": orderId,
        },
        {
          $pull: {
            orders: { "orderContent.file.id": orderId },
          },
        }
      );

      return res.sendStatus(200);
    }
  } catch (err) {
    console.log(err);
    return res.status(500);
  }
});
