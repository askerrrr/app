const express = require("express");
const { env } = require("./env_var.js");
const path = require("path");
const MongoClient = require("mongodb").MongoClient;
const mongodb = new MongoClient(env.mongo_url);

const app = express();

(async () => {
  try {
    await mongodb.connect();
    app.listen(env.PORT, () => console.log("Сервер запущен..."));

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
    id: user.id,
  });

  try {
    if (authHeader && authHeader.split(" ")[1] === `${authToken}`) {
      if (!existingDocument) {
        await collection.insertOne(user);
        res.sendStatus(201).send(user);
      }
    }
  } catch (err) {
    res.status(500).send({ error: "Internal Server Error" });
  }
});

app.get("/api/users", async (req, res) => {
  try {
    const collection = req.app.locals.collection;
    const users = await collection.find({}).toArray();
    res.json(users);
  } catch (err) {
    res.sendStatus(500);
    console.log(err);
  }
});

app.use(express.static(path.join(__dirname, "public")));
