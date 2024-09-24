import { env } from "../env_var.js";
import { fileURLToPath } from "url";
import { dirname, join } from "path";
import { Router, json } from "express";
import compress from "./services/compress.js";
import decompress from "./services/decompress.js";
import { convertToBuffer } from "./services/convertFileToBuffer.js";
import { encodingToBase64 } from "./services/encodingToBase64.js";

const router = Router();
const __dirname = dirname(fileURLToPath(import.meta.url));

router.use(json());

router.post("/", async (req, res) => {
  const collection = req.app.locals.collection;
  const authHeader = req.headers.authorization;
  const authToken = env.auth_token;
  const order = req.body;
  const id = order.tgId;
  const existingDocument = await collection.findOne({
    tgId: id,
  });

  try {
    if (authHeader && authHeader.split(" ")[1] === `${authToken}`) {
      if (existingDocument) {
        await collection.updateOne(
          { tgId: id },
          { $push: { orders: { order } } }
        );

        const fileUrl =
          existingDocument.orders[user.orders.length - 1].order.file.url;
        const buffer = await convertToBuffer(fileUrl);
        const compressedFile = await compress(buffer);

        await collection.updateOne(
          { tgId: id },
          {
            $set: { file: compressedFile },
          }
        );
        return res.sendStatus(201);
      }
    } else if (!authHeader) {
      return res.sendStatus(401);
    }
  } catch (err) {
    res.sendStatus(500);
    console.log(err);
  }
});

router.get("/data/:tgId", async (req, res) => {
  try {
    const tgId = Number(req.params.tgId);
    const collection = req.app.locals.collection;
    const user = await collection.findOne({ tgId: tgId });
    if (user) {
      res.json(user);
    } else {
      res.sendStatus(404);
    }
  } catch {
    return res.status(500);
  }
});

router.get("/:tgId", async (req, res) => {
  try {
    res.sendFile(join(__dirname, "../public", "html", "order.html"));
  } catch {
    return res.status(500);
  }
});

router.get("/data/tgId/:fileId", async (req, res) => {
  try {
    const fileId = Number(req.params.fileId);
    const collection = req.app.locals.collection;
    const user = await collection
      .find({ "orders.order.file.id": fileId })
      .toArray();

    if (user) {
      user.forEach((user) =>
        user.orders.forEach((orders) => {
          if (orders.order.file.id) {
            const decompressBuffer = decompress(orders.order.file.url);
            const base64 = encodingToBase64(decompressBuffer);
            res.json(base64);
          }
        })
      );
    } else {
      res.sendStatus(404);
    }
  } catch (err) {
    console.log(err);
    return res.status(500);
  }
});

export { router as userPath };
