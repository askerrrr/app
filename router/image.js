import { Router } from "express";
import db from "./services/database/db.js";

const router = Router({ caseSensitive: true, strict: true });

router.get("/:userId/:orderId", async (req, res) => {
  try {
    const userId = req.params.userId;
    const orderId = req.params.orderId;
    const collection = req.app.locals.collection;

    const filePath = await db.findFilePath(userId, orderId, collection);

    res.sendFile(filePath, (err) => {
      if (err) {
        res.status(404).send("Image not found");
      }
    });
  } catch (err) {
    return res.sendStatus(500);
  }
});

export { router as image };
