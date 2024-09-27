import { env } from "../env_var.js";
import { fileURLToPath } from "url";
import { dirname, join } from "path";
import { Router, json } from "express";
import fileIsImage from "./services/output/fileIsImage.js";
import getBufferOrString from "./services/output/getBufferOrString.js";
import convertDataToBufferAndCompress from "./services/input/convertDataToBufferAndCompress.js";

const router = Router();
const __dirname = dirname(fileURLToPath(import.meta.url));

router.use(json());

router.post("/", async (req, res) => {
  const collection = req.app.locals.collection;
  const orderFiles = req.app.locals.orderFiles;
  const authHeader = req.headers.authorization;
  const authToken = env.auth_token;
  const orderContent = req.body;
  const fileContent = orderContent.file;
  const id = orderContent.tgId;
  const existingDocument = await collection.findOne({
    tgId: id,
  });
  console.log(existingDocument);
  try {
    if (authHeader && authHeader.split(" ")[1] === `${authToken}`) {
      if (existingDocument) {
        await collection.updateOne(
          { tgId: id },
          { $push: { orders: { orderContent } } }
        );

        await orderFiles.updateOne(
          {
            tgId: id,
          },
          {
            $push: { files: { fileContent } },
          }
        );

        const updateCollection = await orderFiles.findOne({ tgId: id });

        const fileUrl =
          updateCollection.files[updateCollection.files.length - 1].fileContent
            .url;

        if (fileIsImage(fileUrl)) {
          await convertDataToBufferAndCompress(fileUrl, orderFiles, id);
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

router.get("/checkdata", async (req, res) => {
  const collection = req.app.locals.collection;
  const obj = await collection.findOne({ tgId: 43544 });

  const a = obj.orders[obj.orders.length - 1].orderContent.file.url;
  const b = fileIsImage(a);
  res.json(a);
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
      .find({ "orders.orderContent.file.id": fileId })
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
