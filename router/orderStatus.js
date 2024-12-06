import env from "../env_var.js";
import { Router } from "express";
import db from "./services/database/db.js";

var router = Router({ caseSensitive: true, strict: true });

router.get("/api/:userId/:orderId", async (req, res) => {
  try {
    var userId = req.params.userId;
    var orderId = req.params.orderId;
    var collection = req.app.locals.collection;

    var user = await collection.findOne({ userId });

    var result = user.orders.find((item) => item.order.id === orderId);
    var status = result.order.orderStatus;

    return user ? res.json(status) : res.sendStatus(404);
  } catch (err) {
    console.log(err);
    return res.sendStatus(500);
  }
});

router.patch("/:userId/:orderId/:status", async (req, res) => {
  try {
    var collection = req.app.locals.collection;
    var userId = req.params.userId;
    var orderId = req.params.orderId;
    var status = req.params.status;

    let [statusValue, statusId] = status.split(":");

    statusId = statusId.split("").reverse()[0];

    var updatedStatus = `${statusValue}:${statusId}`;

    var existingDocument = await collection.findOne({ userId });

    if (!existingDocument) return res.sendStatus(404);

    var botResponse = await fetch(env.bot_server_ip, {
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
