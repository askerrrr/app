import { Router } from "express";
import db from "../../database/db.js";

var router = Router({ caseSensitive: true, strict: true });

router.patch("/", async (req, res) => {
  var index = req.body.index;
  var userId = req.body.userId;
  var itemId = req.body.itemId;
  var orderId = req.body.orderId;

  var itemCollection = req.app.locals.itemCollection;

  await db.updateItemId(userId, orderId, index, itemId, itemCollection);
  return res.sendStatus(200);
});

export { router as itemId };
