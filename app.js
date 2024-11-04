import path from "path";
import express from "express";
import { dirname } from "path";
import env from "./env_var.js";
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

    const db = mongodb.db("database");
    const collection = db.collection("users");
    app.locals.collection = collection;

    const adminDB = mongodb.db("admin");
    const adminCollection = adminDB.collection("system.users");
    app.locals.adminCollection = adminCollection;

    const userDB = mongodb.db("users");
    const userCollection = userDB.collection("users");
    app.locals.userCollection = userCollection;
  } catch (err) {
    console.log(err);
  }
})();

import { home } from "./router/home.js";
import { auth } from "./router/auth.js";
import { userPath } from "./router/userOrder.js";
import { download } from "./router/downloadFile.js";
import { orderStatus } from "./router/orderStatus.js";

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", home);
app.use("/auth", auth);
app.use("/download", download);
app.use("/orderinfo", userPath);
app.use("/status", orderStatus);
