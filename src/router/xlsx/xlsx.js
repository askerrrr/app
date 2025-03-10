import { Router } from "express";
import { fileURLToPath } from "url";
import { dirname, join } from "path";
import db from "../../database/db.js";
import combineData from "./services/combineXlsxData.js";
import checkFileExists from "./services/checkFileExists.js";
import getDataFromXLSX from "./services/getDataFromXLSX.js";
import getImageFromXLSX from "./services/getImageFromXLSX.js";

var router = Router();
var __dirname = dirname(fileURLToPath(import.meta.url));

router.get("/:userid/:orderid", async (_, res) => {
  try {
    res.sendFile(join(__dirname, "..", "..", "public", "html", "sheet.html"));
  } catch (err) {
    console.log(err);

    res.sendStatus(500);
  }
});

router.get("/api/:userId/:orderId", async (req, res) => {
  try {
    var { userId, orderId } = req.params;

    var collection = req.app.locals.collection;
    var itemCollection = req.app.locals.itemCollection;

    var filePath = await db.findFilePath(userId, orderId, collection);

    var data = await getDataFromXLSX(filePath);
    var imageData = await getImageFromXLSX(filePath);
    var items = await db.getItemStatus(userId, orderId, itemCollection);
    var itemId = await db.getItemId(userId, orderId, itemCollection);

    var combinedData = await combineData(data, imageData, items, itemId);

    res.json(combinedData);
  } catch (err) {
    console.log(err);

    res.sendStatus(500);
  }
});

router.get("/check/:userId/:orderId", async (req, res) => {
  var { userId, orderId } = req.params;

  var collection = req.app.locals.collection;
  var filePath = await db.findFilePath(userId, orderId, collection);

  var fileIsExists = await checkFileExists(filePath);

  res.json({ fileIsExists });
});

export { router as xlsx };
