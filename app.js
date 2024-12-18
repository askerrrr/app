import helmet from "helmet";
import express from "express";
import env from "./env_var.js";
import { dirname, join } from "path";
import { fileURLToPath } from "url";
import { MongoClient } from "mongodb";
import cookieParser from "cookie-parser";
import verifyToken from "./router/services/different/verifyToken.js";

var app = express();
var mongodb = new MongoClient(env.mongo_url);
var __dirname = dirname(fileURLToPath(import.meta.url));

(async () => {
  try {
    await mongodb.connect();
    app.listen(env.PORT, env.HOST, () =>
      console.log("The server is running...")
    );

    var db = mongodb.db("database");
    var collection = db.collection("users");
    app.locals.collection = collection;

    var adminDB = mongodb.db("admin");
    var adminCollection = adminDB.collection("adminData");
    app.locals.adminCollection = adminCollection;
  } catch (err) {
    console.log(err);
  }
})();

import { home } from "./router/home.js";
import { xlsx } from "./router/xlsx.js";
import { auth } from "./router/auth.js";
import { image } from "./router/image.js";
import { botApi } from "./router/botApi.js";
import { userPath } from "./router/userOrder.js";
import { download } from "./router/downloadFile.js";
import { orderStatus } from "./router/orderStatus.js";

app.use(helmet());

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(join(__dirname, "public")));

app.use("/auth", auth);
app.use("/bot", botApi);

app.use(cookieParser());
app.use(verifyToken);

app.use("/", home);
app.use("/xlsx", xlsx);
app.use("/image", image);
app.use("/download", download);
app.use("/orderinfo", userPath);
app.use("/status", orderStatus);
