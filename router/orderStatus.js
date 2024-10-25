import { fileURLToPath } from "url";
import { dirname, join } from "path";
import { Router, json } from "express";

const router = Router({ caseSensitive: true, strict: true });
const __dirname = dirname(fileURLToPath(import.meta.url));

router.use(json());

router.post("/:userId/:fileId/:status", async (req, res) => {
  try {
    const collection = req.app.locals.collection;
    const userId = req.params.userId;
    const fileId = req.params.fileId;
    const status = req.params.status;

    console.log(status);

    const existingDocument = await collection.findOne({
      userId,
      "orders.orderContent.file.id": fileId,
    });

    if (existingDocument) {
      await collection.updateOne(
        {
          userId,
          "orders.orderContent.file.id": fileId,
        },
        { $set: { "orders.$.orderContent.file.status": status } }
      );

      return res.sendStatus(200);
    }
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
});

router.get("/api/:userId/:fileId", async (req, res) => {
  try {
    const userId = req.params.userId;
    const fileId = req.params.fileId;
    const collection = req.app.locals.collection;

    const user = await collection.findOne({
      userId,
      "orders.orderContent.file.id": fileId,
    });

    const result = user.orders.find((item) => item);
    const status = result.orderContent.file.status;
    console.log(result, status);
    return user ? res.json(status) : res.sendStatus(404);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
});

export { router as orderStatus };
