import { Router } from "express";
import db from "./services/database/db";

const router = Router({ caseSensitive: true, strict: true });

router.get("/var/www/userFiles/:id/:fileid", async (req, res) => {
  try {
    const userId = req.params.id;
    const fileId = req.params.fileid;

    const collection = req.app.locals.collection;
    const dirType = await db.findOrderType(userId, fileId, collection);

    return res.download(
      `/var/www/userFiles/${userId}/${dirType}/${fileId}`,
      (err) => {
        if (err) {
          console.log("Ошибка при скачивании файла", err);
        }
        console.log("Файл успешно скачан");
      }
    );
  } catch (err) {
    console.log(err);
  }
});

export { router as download };
