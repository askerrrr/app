import { Router } from "express";
import db from "./services/database/db.js";

const router = Router({ caseSensitive: true, strict: true });

router.get("/:userId/:fileid", async (req, res) => {
  try {
    const userId = req.params.userId;
    const fileId = req.params.fileid;

    const collection = req.app.locals.collection;
    const filePath = await db.findFilePath(userId, fileId, collection);

    return res.download(filePath, (err) => {
      if (err) {
        console.log("Ошибка при скачивании файла", err);
      }
      console.log("Файл успешно скачан");
    });
  } catch (err) {
    console.log(err);
  }
});

export { router as download };
