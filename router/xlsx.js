import xlsx from "xlsx";
import { Router } from "express";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const router = Router();
const __dirname = dirname(fileURLToPath(import.meta.url));

router.get("/", async (req, res) => {
  res.sendFile(join(__dirname, "../public", "html", "sheet.html"));
});

router.get("/api", async (req, res) => {
  const filePath = "sdf.xlsx";

  const workBook = xlsx.readFile(filePath, { type: "buffer" });

  const ws = workBook.Sheets[workBook.SheetNames[0]];

  const html = xlsx.utils.sheet_to_html(ws);
  console.log(html);
});

export { router as xlsx };
