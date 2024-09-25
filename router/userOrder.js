import { env } from "../env_var.js";
import { fileURLToPath } from "url";
import { dirname, join } from "path";
import { Router, json } from "express";
import fileIsImage from "./services/fileIsImage.js";
import getBufferOrString from "./services/getBufferOrString.js";
import convertDataToBufferAndCompress from "./services/convertDataToBufferAndCompress.js";

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
  console.log(existingDocument);
  try {
    if (authHeader && authHeader.split(" ")[1] === `${authToken}`) {
      if (existingDocument) {
        await collection.updateOne(
          { tgId: id },
          { $push: { orders: { order } } }
        );

        const fileUrl =
          existingDocument.orders[existingDocument.orders.length - 1].order.file
            .url;

        if (fileIsImage(fileUrl)) {
          await convertDataToBufferAndCompress(fileUrl, collection, id);
          return res.sendStatus(201);
        } else {
          return res.sendStatus(201);
        }
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

router.get("/:tgId", async (_, res) => {
  try {
    res.sendFile(join(__dirname, "../public", "html", "userOrder.html"));
  } catch (err) {
    console.log(err);
    return res.status(500);
  }
});

router.get("/data/tgId/:fileId", async (req, res) => {
  try {
    const fileId = Number(req.params.fileId);
    const collection = req.app.locals.collection;
    const data = await collection
      .find({ "orders.order.file.id": fileId })
      .toArray();

    const result = await getBufferOrString(data);

    if (result) {
      res.json({ result });
    } else {
      res.sendStatus(404);
    }
  } catch (err) {
    console.log(err);
    return res.status(500);
  }
});

export { router as userPath };
