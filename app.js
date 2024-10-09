import path from "path";
import express from "express";
import { dirname } from "path";
import { env } from "./env_var.js";
import { fileURLToPath } from "url";
import { MongoClient } from "mongodb";

const __dirname = dirname(fileURLToPath(import.meta.url));
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

import { home } from "./router/home.js";
import { userPath } from "./router/userOrder.js";

app.use(express.urlencoded());
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", home);
app.use("/orderinfo", userPath);
