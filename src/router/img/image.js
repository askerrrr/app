import { Router } from "express";
import db from "../../database/db.js";

var router = Router({ caseSensitive: true, strict: true });

router.get("/:userId/:orderId", async (req, res) => {
  try {
    var { userId, orderId } = req.params;

    var collection = req.app.locals.collection;

    var filePath = await db.findFilePath(userId, orderId, collection);

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
