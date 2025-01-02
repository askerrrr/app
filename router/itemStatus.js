import { Router } from "express";
import db from "./services/database/db.js";

var router = Router({ caseSensitive: true, strict: true });

router.patch("/:userId/:orderId/:item", async (req, res) => {
  var userId = req.params.userId;
  var orderId = req.params.orderId;
  var item = req.params.item;
  var itemStatus = req.app.locals.itemStatus;

  await db.updateItemStatus(userId, orderId, item, itemStatus);
  return res.sendStatus(200);
});

export { router as itemStatus };
