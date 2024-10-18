import { fileURLToPath } from "url";
import { dirname, join } from "path";
import { Router, json } from "express";

const router = Router({ caseSensitive: true, strict: true });
const __dirname = dirname(fileURLToPath(import.meta.url));

router.use(json());

router.get("/:userId/:orderId/", async (_, res) => {
  try {
    res.sendFile(join(__dirname, "../public", "html", "orderStatus.html"));
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
});

export { router as orderStatus };
