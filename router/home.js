import { Router } from "express";
import checkAuthToken from "./services/different/checkAuthToken.js";

const router = Router({ caseSensitive: true, strict: true });
router.post("/", async (req, res) => {
  const collection = req.app.locals.collection;
  const authHeader = req.headers.authorization;
  const user = req.body;
  const existingDocument = await collection.findOne({
    tgId: user.tgId,
  });

  try {
    const authToken = checkAuthToken(authHeader);

    if (authToken) {
      if (!existingDocument) {
        await collection.insertOne(user);
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
