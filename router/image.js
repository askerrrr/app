import { Router } from "express";
import db from "./services/database/db.js";

const router = Router({ caseSensitive: true, strict: true });

router.get("/:userId/:fileId", async (req, res) => {
  try {
    const userId = req.params.userId;
    const fileId = req.params.fileId;
    const collection = req.app.locals.collection;

    const filePath = await db.findFilePath(userId, fileId, collection);

    res.sendFile(filePath, (err) => {
      if (err) {
        res.status(404).send("Image not found");
      }
    });
  } catch (err) {
    console.log(err);
  }
});

export { router as image };
