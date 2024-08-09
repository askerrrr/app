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

app.use( express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
app.use( express.json());

app.post("/", async (req, res) => {
  const collection = req.app.locals.collection;
  let user = req.body;
  const authHeader = req.headers.authorization;
  const existingDocument = await collection.findOne({
    id: user.id,
  });

  if (authHeader && authHeader.split(" ")[1] === `${env.auth_token}`) {
    if (!existingDocument) {
      res.send(user);
      await collection.insertOne(user);
    }
  }
});

app.get("/users", async (req, res) => {
  try {
    const collection = req.app.locals.collection;
    const users = await collection.find({}).toArray();
    res.json(users);
  } catch (err) {
    console.log(err);
  }
});
