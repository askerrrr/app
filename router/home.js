import { env } from "../env_var.js";
import { Router } from "express";

const router = Router();
router.post("/", async (req, res) => {
  const collection = req.app.locals.collection;
  const orderFiles = req.app.locals.collection;
  const authHeader = req.headers.authorization;
  const authToken = env.auth_token;
  const user = req.body;
  const existingDocument = await collection.findOne({
    tgId: user.tgId,
  });

  try {
    if (authHeader && authHeader.split(" ")[1] === `${authToken}`) {
      if (!existingDocument) {
        await collection.insertOne(user);
        await orderFiles.insertOne({ tgId: user.tgId, files: [] });
        return res.status(201).send(user);
      } else if (existingDocument) {
        return res.sendStatus(409);
      }
    } else if (!authHeader) {
      return res.sendStatus(401);
    }
  } catch (err) {
    return res.status(500);
  }
});

router.get("/users", async (req, res) => {
  try {
    const collection = req.app.locals.collection;
    const users = await collection.find({}).toArray();
    return res.json(users);
  } catch {
    return res.status(500);
  }
});

export { router as home };
