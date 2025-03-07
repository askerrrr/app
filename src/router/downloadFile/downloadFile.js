import { Router } from "express";
import db from "../../database/db.js";
import checkFileExists from "../xlsx/services/checkFileExists.js";

var router = Router({ caseSensitive: true, strict: true });

router.get("/:userId/:orderId", async (req, res) => {
  try {
    var userId = req.params.userId;
    var orderId = req.params.orderId;

    var collection = req.app.locals.collection;
    var filePath = await db.findFilePath(userId, orderId, collection);

    return res.download(filePath);
  } catch (err) {
    console.log(err);
    return res.sendStatus(500);
  }
});

router.get("/check/:userId/:orderId", async (req, res) => {
  var userId = req.params.userId;
  var orderId = req.params.orderId;
  var collection = req.app.locals.collection;

  var filePath = await db.findFilePath(userId, orderId, collection);

  var fileIsExists = await checkFileExists(filePath);

  return res.json({ fileIsExists });
});

export { router as download };
