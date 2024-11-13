import { fileURLToPath } from "url";
import { dirname, join } from "path";
import { Router } from "express";

const router = Router({ caseSensitive: true, strict: true });
const __dirname = dirname(fileURLToPath(import.meta.url));

router.get("/", async (req, res) => {
  try {
    res.sendFile(join(__dirname, "../public", "html", "image.html"));
  } catch (err) {
    console.log(err);
  }
});

export { router as image };
