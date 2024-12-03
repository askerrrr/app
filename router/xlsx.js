import { Router } from "express";
import { fileURLToPath } from "url";
import { dirname, join } from "path";
import db from "./services/database/db.js";
import getDataFromXLSX from "./services/different/getDataFromXLSX.js";
import getImageFromXLSX from "./services/different/getImageFromXLSX.js";

const router = Router();
const __dirname = dirname(fileURLToPath(import.meta.url));

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
    const base64 = await getImageFromXLSX(filePath);

    return res.json({ base64 });
  } catch (err) {
    console.log(err);

    res.sendStatus(500);
  }
});

router.get("/data", async (req, res) => {
  var filePath = "file.xlsx";
  var data = await getDataFromXLSX(filePath);
  return res.json(data);
});

export { router as xlsx };
// const userId = req.params.userId;
// const orderId = req.params.orderId;
// const collection = req.app.locals.collection;

// const filePath = await db.findFilePath(userId, orderId, collection);
//await getImageFromXLSX("file.xlsx");
