import { env } from "../env_var.js";
import { fileURLToPath } from "url";
import { dirname, join } from "path";
import { Router, json } from "express";

const router = Router();
const __dirname = dirname(fileURLToPath(import.meta.url));

router.use(json());

router.post("/", async (req, res) => {
  const collection = req.app.locals.collection;
  const authHeader = req.headers.authorization;
  const authToken = env.auth_token;
  const userOrder = req.body;
  const userOrderId = userOrder.tgId;

  const existingDocument = await collection.findOne({
    tgId: userOrderId,
  });

  try {
    if (authHeader && authHeader.split(" ")[1] === `${authToken}`) {
      if (existingDocument) {
        await collection.updateOne(
          { tgId: userOrderId },
          { $push: { orders: { userOrder } } }
        );

        return res.sendStatus(201).json({ message: "Данные успешно приняты" });
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
    const userInfo = await collection.findOne({ tgId: tgId });
    if (userInfo) {
      res.json(userInfo);
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

router.get("/getimage/:tgId", async (req, res) => {
  try {
    const collection = req.app.locals.collection;
    const tgId = req.params.tgId;
    const userInfo = await collection.findOne({ tgId: tgId });
    if (userInfo) {
      res.json(userInfo);
    } else {
      res.sendStatus(404);
    }
  } catch {
    return res.status(500);
  }
});

router.get("/tgId/:image", async (req, res) => {
  try {
    res.sendFile(join(__dirname, "../public", "html", "sendImage.html"));
  } catch {
    return res.sendStatus(500);
  }
});
export { router as userPath };
