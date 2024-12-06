import env from "../env_var.js";
import { Router } from "express";
import db from "./services/database/db.js";

const router = Router({ caseSensitive: true, strict: true });

router.get("/api/:userId/:orderId", async (req, res) => {
  try {
    const userId = req.params.userId;
    const orderId = req.params.orderId;
    const collection = req.app.locals.collection;

    const user = await collection.findOne({ userId });

    const result = user.orders.find((item) => item.order.id === orderId);
    const status = result.order.orderStatus;

    return user ? res.json(status) : res.sendStatus(404);
  } catch (err) {
    console.log(err);
    return res.sendStatus(500);
  }
});

router.patch("/:userId/:orderId/:status", async (req, res) => {
  try {
    const collection = req.app.locals.collection;
    const userId = req.params.userId;
    const orderId = req.params.orderId;
    const status = req.params.status;

    let [statusValue, statusId] = status.split(":");

    statusId = statusId.split("").reverse()[0];

    const updatedStatus = `${statusValue}:${statusId}`;

    const existingDocument = await collection.findOne({ userId });

    if (!existingDocument) return res.sendStatus(404);

    const botResponse = await fetch(env.bot_server_ip, {
      method: "PATCH",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${env.bearer_token}`,
      },
      body: JSON.stringify({
        userId,
        orderId,
        updatedStatus,
      }),
    });

    if (!botResponse.ok) return res.sendStatus(500);

    await db.updateOrderStatus(userId, orderId, updatedStatus, collection);
    return res.sendStatus(200);
  } catch (err) {
    if (err.message === "fetch failed") return res.sendStatus(500);
  }
});

export { router as orderStatus };
