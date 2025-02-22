import { Router } from "express";
import db from "../database/db.js";
import { access, constants } from "fs/promises";

var router = Router({ caseSensitive: true, strict: true });

router.get("/:userId/:orderId", async (req, res) => {
  try {
    var userId = req.params.userId;
    var orderId = req.params.orderId;

    var collection = req.app.locals.collection;
    var filePath = await db.findFilePath(userId, orderId, collection);

    await access(filePath, constants.F_OK)
      .then(() => res.download(filePath))
      .catch(() => {
        console.log(`${filePath} the file does not exist`);
        res.status(404).send("File not found");
      });
  } catch (err) {
    console.log(err);
    return res.sendStatus(500);
  }
});

export { router as download };
