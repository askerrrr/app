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
      .catch((err) =>
        console.log(
          ` ${filePath} the file does not exist`,
          res.status(404).json({ err })
        )
      );
  } catch (err) {
    console.log(err);
  }
});

export { router as download };
