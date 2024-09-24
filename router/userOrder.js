import { env } from "../env_var.js";
import { fileURLToPath } from "url";
import { dirname, join } from "path";
import { Router, json } from "express";
import compress from "./services/compress.js";
import { convertToBuffer } from "./services/convertFileToBuffer.js";
import { encodingToBase64 } from "./services/encodingToBase64.js";

const router = Router();
const __dirname = dirname(fileURLToPath(import.meta.url));

router.use(json());

router.post("/", async (req, res) => {
  const collection = req.app.locals.collection;
  const authHeader = req.headers.authorization;
  const authToken = env.auth_token;
  const userOrder = req.body;
  const id = userOrder.tgId;
  const existingDocument = await collection.findOne({
    tgId: id,
  });

  try {
    if (authHeader && authHeader.split(" ")[1] === `${authToken}`) {
      if (existingDocument) {
        await collection.updateOne(
          { tgId: id },
          { $push: { orders: { userOrder } } }
        );

        const fileUrl =
          existingDocument.orders[user.orders.length - 1].userOrder.file;
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
    res.sendFile(join(__dirname, "../public", "html", "userOrder.html"));
  } catch {
    return res.status(500);
  }
});

router.get("/", async (req, res) => {
  try {
    const collection = req.app.locals.collection;
    const tgId = Number(req.params.tgId);
    const user = await collection.findOne({ tgId: tgId });
    const fileUrl = user.orders[user.orders.length - 1].userOrder.file;

    if (user) {
      const buffer = "";
      await collection.updateOne({ tgId }, { $set: { fileUrl: file } });
    } else {
      res.sendStatus(404);
    }
  } catch (err) {
    console.log(err);
    return res.status(500);
  }
});

export { router as userPath };
