import { fileURLToPath } from "url";
import { dirname, join } from "path";
import { Router, json } from "express";
import addNewOrder from "./services/addNewOrder.js";
import checkFileUrl from "./services/checkFileUrl.js";
import checkAuthToken from "./services/checkAuthToken.js";
import updateOrderContent from "./services/updateOrderContent.js";

const router = Router();
const __dirname = dirname(fileURLToPath(import.meta.url));

router.use(json());

router.post("/", async (req, res) => {
  try {
    const collection = req.app.locals.collection;
    const authHeader = req.headers.authorization;
    const orderContent = req.body;
    const id = orderContent.tgId;

    const authToken = checkAuthToken(authHeader);
    const existingDocument = await collection.findOne({
      tgId: id,
    });

    if (authToken) {
      if (existingDocument) {
        const fileURL = orderContent.file.url;
        const result = await checkFileUrl(id, fileURL, collection);
        if (result) {
          await updateOrderContent(id, orderContent, collection);
          return res.sendStatus(201);
        } else {
          await addNewOrder(id, collection, orderContent);
          return res.sendStatus(201);
        }
      } else if (!authHeader) {
        return res.sendStatus(401);
      }
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

router.get("/data/order/:orderId", async (req, res) => {
  try {
    const orderId = req.params.orderId;
    const collection = req.app.locals.collection;

    const user = await collection.findOne({
      "orders.orderContent.file.id": orderId,
    });

    const order = user.orders.find(
      (order) => order.orderContent.file.id === orderId
    );

    if (order) {
      console.log(order);
      res.json(order);
    } else {
      res.sendStatus(404);
    }
  } catch {
    return res.status(500);
  }
});

router.get("/orders/order/:orderId", async (_, res) => {
  try {
    res.sendFile(join(__dirname, "../public", "html", "userOrder.html"));
  } catch (err) {
    console.log(err);
    return res.status(500);
  }
});

router.get("/orders/:tgId", async (_, res) => {
  try {
    res.sendFile(join(__dirname, "../public", "html", "ordersList.html"));
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
});
export { router as userPath };
