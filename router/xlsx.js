import { Router } from "express";
import { fileURLToPath } from "url";
import { dirname, join } from "path";
import db from "./services/database/db.js";
import getDataFromXLSX from "./services/different/getDataFromXLSX.js";
import getImageFromXLSX from "./services/different/getImageFromXLSX.js";

const router = Router();
const __dirname = dirname(fileURLToPath(import.meta.url));

router.get("/", async (_, res) => {
  res.sendFile(join(__dirname, "../public", "html", "sheet.html"));
});

router.get("/api", async (req, res) => {
  //const useId = req.params.userId
  //const orderId = req.params.orderId
  //const collection = req.app.locals.collection
  //await db.findFilePath(userId, orderId, collection)

  const filePath = "sdf.xlsx";
  const data = await getDataFromXLSX(filePath);

  // const images = await getImageFromXLSX(filePath);

  // const jsonResponse = {
  //   images: images.map((img) => ({
  //     name: img.name,
  //     data: `data:image/png;base64,${img.base64}`,
  //   })),
  // };

  // console.log(jsonResponse);
  return res.json(data);
});

export { router as xlsx };
