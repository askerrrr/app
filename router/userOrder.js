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
    const id = orderContent.tgId;
    const fileUrl = orderContent.file.url;

    const validToken =
      authHeader && authHeader.split(" ")[1] === `${env.auth_token}`;

    const existingDocument = await collection.findOne({
      tgId: id,
    });

    if (validToken) {
      if (existingDocument) {
        await downloadAndSaveFile(id, fileUrl);

        const dublicateUrl = await db.findDublicateUrl(
          collection,
          orderContent
        );
        if (dublicateUrl) {
          await db.updateOrderContent(collection, orderContent);
          return res.sendStatus(201);
        } else {
          await db.addNewOrder(collection, orderContent);
          return res.sendStatus(201);
        }
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

router.get("/data/:tgId", async (req, res) => {
  try {
    const tgId = Number(req.params.tgId);
    const collection = req.app.locals.collection;
    const user = await collection.findOne({ tgId: tgId });

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

router.get("/orders/:tgId", async (_, res) => {
  try {
    res.sendFile(join(__dirname, "../public", "html", "ordersList.html"));
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
});
export { router as userPath };
