import JWT from "jsonwebtoken";
import env from "../env_var.js";
import { Router } from "express";

const router = Router({ caseSensitive: true, strict: true });

router.get("/api/:userId/:fileId", async (req, res) => {
  try {
    const userId = req.params.userId;
    const fileId = req.params.fileId;
    const collection = req.app.locals.collection;

    const user = await collection.findOne({
      userId,
      "orders.order.file.id": fileId,
    });

    const result = user.orders.find((item) => item.order.file.id === fileId);
    const status = result.order.file.status;

    return user ? res.json(status) : res.sendStatus(404);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
});

router.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", env.bot_server_ip);
  res.setHeader("Access-Control-Allow-Methods", ["POST"].join(","));
  res.setHeader(
    "Access-Control-Allow-Headers",
    ["Content-Type", "Authorization"].join(",")
  );

  next();
});

router.post("/:userId/:fileId/:status", async (req, res) => {
  try {
    const collection = req.app.locals.collection;
    const userId = req.params.userId;
    const fileId = req.params.fileId;
    const status = req.params.status;

    let [statusValue, statusId] = status.split(":");

    statusId = statusId.split("").reverse()[0];

    const existingDocument = await collection.findOne({
      userId,
      "orders.order.file.id": fileId,
    });
    console.log(
      JSON.stringify({ userId, fileId, status: `${statusValue}:${statusId}` })
    );
    if (!existingDocument)
      return res.status(404).json({ err: `user ${userId} not found` });

    await collection.updateOne(
      {
        userId,
        "orders.order.file.id": fileId,
      },
      { $set: { "orders.$.order.file.status": status } }
    );

    const botResponse = await fetch(env.bot_server_ip, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${secretKey}`,
      },
      body: JSON.stringify({
        userId,
        fileId,
        status: `${statusValue}:${statusId}`,
      }),
    });

    if (!botResponse.ok) {
      const err = await botResponse.text();
      console.log("botResponse.error", err);
      return res.status(500).json({ error: "Ошибка при запросе к боту" });
    }

    const json = await botResponse.json();

    return res
      .status(200)
      .json({ message: "Статус успешно обновлен", botResponse: json });
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
});

export { router as orderStatus };
