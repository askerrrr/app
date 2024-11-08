import { Router } from "express";

const router = Router({ caseSensitive: true, strict: true });

router.post("/:userId/:fileId/:status", async (req, res) => {
  try {
    const collection = req.app.locals.collection;
    const userId = req.params.userId;
    const fileId = req.params.fileId;
    const status = req.params.status;

    const existingDocument = await collection.findOne({
      userId,
      "orders.order.file.id": fileId,
    });

    if (existingDocument) {
      await collection.updateOne(
        {
          userId,
          "orders.order.file.id": fileId,
        },
        { $set: { "orders.$.order.file.status": status } }
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
      "orders.order.file.id": fileId,
    });

    const result = user.orders.find((item) => item.order.file.id === fileId);
    const status = result.order.file.status;
    console.log(result, status);
    return user ? res.json(status) : res.sendStatus(404);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
});

export { router as orderStatus };
