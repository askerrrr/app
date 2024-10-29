import env from "../env_var.js";
import { Router } from "express";

const router = Router({ caseSensitive: true, strict: true });
router.post("/", async (req, res) => {
  res.setHeader("Content-Type", "application/json");
  const collection = req.app.locals.collection;
  const authHeader = req.headers.authorization;
  const user = req.body;
  const existingDocument = await collection.findOne({
    userId: user.userId,
  });

  try {
    const validToken =
      authHeader && authHeader.split(" ")[1] === `${env.auth_token}`;

    if (validToken) {
      if (!existingDocument) {
        await collection.insertOne(user);
        return res.sendStatus(201);
      } else if (existingDocument) {
        return res.sendStatus(409);
      }
    } else {
      return res.sendStatus(401);
    }
  } catch (err) {
    return res.sendStatus(500);
  }
});

router.get("/api/users", async (req, res) => {
  try {
    const collection = req.app.locals.collection;
    const users = await collection.find({}).toArray();
    console.log(users);
    return res.json(users);
  } catch {
    return res.status(500);
  }
});

export { router as home };
