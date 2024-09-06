const express = require("express");
const { env } = require("./env_var.js");
const path = require("path");
const MongoClient = require("mongodb").MongoClient;
const mongodb = new MongoClient(env.mongo_url);

const app = express();

(async () => {
  try {
    await mongodb.connect();
    app.listen(env.PORT, env.HOST, () =>
      console.log("The server is running...")
    );

    const db = mongodb.db("TelegramUsers");
    const collection = db.collection("users");
    app.locals.collection = collection;
  } catch (err) {
    console.log(err);
  }
})();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.post("/api", async (req, res) => {
  const collection = req.app.locals.collection;
  const authHeader = req.headers.authorization;
  const authToken = env.auth_token;
  const user = req.body;
  const existingDocument = await collection.findOne({
    id: user.tgId,
  });

  try {
    if (authHeader && authHeader.split(" ")[1] === `${authToken}`) {
      if (!existingDocument) {
        await collection.insertOne(user);

        return res.status(201).send(user);
      } else if (existingDocument) {
        return res.sendStatus(409);
      }
    } else if (!authHeader) {
      return res.sendStatus(401)
    }
  } catch (err) {
    return res.status(500)
  }
});

app.get("/api/users", async (req, res) => {
  try {
    const collection = req.app.locals.collection;
    const users = await collection.find({}).toArray();
    return res.json(users);
  } catch (err) {
    return res.status(500);
  }
});

app.use(express.static(path.join(__dirname, "public")));
