import { Router } from "express";
import db from "./services/database/db.js";
import { access, constants } from "fs/promises";

const router = Router({ caseSensitive: true, strict: true });

router.get("/:userId/:fileid", async (req, res) => {
  try {
    const userId = req.params.userId;
    const fileId = req.params.fileid;

    const collection = req.app.locals.collection;
    const filePath = await db.findFilePath(userId, fileId, collection);

    await access(filePath, constants.F_OK)
      .then(() => res.download(filePath))
      .catch(() => {
        console.log(`${filePath} the file does not exist`);
        res.status(404).send("File not found");
      });
  } catch (err) {
    console.log(err);
    res.status(500).send("Internal Server Error");
  }
});

export { router as download };
