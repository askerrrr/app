const path = require("path");
const express = require("express");
const { env } = require("./env_var.js");

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

    const userOrders = mongodb.db("userOrders");
    const userAndOrders = userOrders.collection("userAndOrders");
    app.locals.userAndOrders = userAndOrders;
  } catch (err) {
    console.log(err);
  }
})();

const userPath = require("./router/userOrder");
const home = require("./router/home.js");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));
app.use("/api", home);
app.use("/api/orderinfo", userPath);
