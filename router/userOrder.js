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
    const user = await collection.findOne({ userId: userId });

    return user ? res.json(user) : res.sendStatus(404);
  } catch {
    return res.status(500).send("Internal Server Error");
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
    return res.status(500).send("Internal Server Error");
  }
});

router.get("/orders/order/:orderId", async (_, res) => {
  try {
    res.sendFile(join(__dirname, "../public", "html", "userOrder.html"));
  } catch (err) {
    console.log(err);
    res.status(500).send("Internal Server Error");
  }
});

router.get("/orders/:userId", async (_, res) => {
  try {
    res.sendFile(join(__dirname, "../public", "html", "ordersList.html"));
  } catch (err) {
    console.log(err);
    return res.status(500).send("Internal Server Error");
  }
});

router.delete("/api/delete/:userId", async (req, res) => {
  const userId = req.params.userId;
  const collection = req.app.locals.collection;

  await db
    .deleteUser(userId, collection)
    .then(() => deleteUserDir(userId))
    .then(() => res.sendStatus(200))
    .catch(
      (err) => console.log(err),
      res.status(500).send("Internal Server Error")
    );
});

router.delete("/api/delete/:userId/:orderId", async (req, res) => {
  const userId = req.params.userId;
  const orderId = req.params.orderId;
  const collection = req.app.locals.collection;

  await deleteOrderFile(userId, orderId, collection)
    .then(() => db.deleteOrder(userId, orderId, collection))
    .then(() => res.status(200))
    .catch(
      (err) => console.log(err),
      res.status(500).send("Internal Server Error")
    );

  const botResponse = await fetch(env.bot_server_ip, {
    method: "DELETE",
    body: JSON.stringify({ userId, orderId }),
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${env.bearer_token}`,
    },
  });

  if (!botResponse.ok) {
    const err = await botResponse.text();
    console.log("botResponse.error", err);
    return res.status(500).json({ error: "Error when requesting the bot" });
  }
});

export { router as userPath };
