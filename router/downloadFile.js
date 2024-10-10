import { Router, json } from "express";

const router = Router({ caseSensitive: true, strict: true });

router.get("/var/www/userFiles/:id/:fileid", async (req, res) => {
  try {
    const userId = req.params.id;
    const fileId = req.params.fileid;
    return res.download(
      `/var/www/userFiles/${userId}/${fileId}.xlsx`,
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
