import { Router } from "express";

const router = Router({ caseSensitive: true, strict: true });

router.get("/api/users", async (req, res) => {
  try {
    const collection = req.app.locals.collection;
    const users = await collection.find({}).toArray();

    return res.json(users);
  } catch {
    res.status(500).send("Internal Server Error");
  }
});

export { router as home };
