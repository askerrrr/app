import { Router } from "express";
import { fileURLToPath } from "url";
import { dirname, join } from "path";
import db from "./services/database/db.js";
import getDataFromXLSX from "./services/different/getDataFromXLSX.js";

var router = Router();
var __dirname = dirname(fileURLToPath(import.meta.url));

router.get("/", async (_, res) => {
  try {
    res.sendFile(join(__dirname, "../public", "html", "sheet.html"));
  } catch (err) {
    console.log(err);

    res.sendStatus(500);
  }
});

router.get("/api", async (req, res) => {
  //:userId/:orderId
  try {
    var filePath = "file.xlsx";

    var data = await getDataFromXLSX(filePath);

    return res.json(data);
  } catch (err) {
    console.log(err);

    res.sendStatus(500);
  }
});

export { router as xlsx };
// var userId = req.params.userId;
// var orderId = req.params.orderId;
// var collection = req.app.locals.collection;

// var filePath = await db.findFilePath(userId, orderId, collection);
//await getImageFromXLSX("file.xlsx");
