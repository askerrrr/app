import { Router } from "express";
import logger from "../../logger.js";
import db from "../../database/db.js";
import checkFileExists from "../xlsx/services/checkFileExists.js";

var router = Router({ caseSensitive: true, strict: true });

router.get("/:userId/:orderId", async (req, res) => {
  try {
    var { userId, orderId } = req.params;

    var collection = req.app.locals.collection;
    var filePath = await db.findFilePath(userId, orderId, collection);

    return res.download(filePath);
  } catch (err) {
    logger.error({ place: "download order file", userId, err });
    return res.sendStatus(500);
  }
});

router.get("/check/:userId/:orderId", async (req, res) => {
  var { userId, orderId } = req.params;

  var collection = req.app.locals.collection;
  try {
    var filePath = await db.findFilePath(userId, orderId, collection);

    var fileIsExists = await checkFileExists(filePath);

    res.json({ fileIsExists });
  } catch (err) {
    logger.error({ place: "checking order file exists", userId, err });
    res.status(500);
  }
});

export { router as download };
