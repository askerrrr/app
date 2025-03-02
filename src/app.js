import helmet from "helmet";
import express from "express";
import env from "./env_var.js";
import { dirname, join } from "path";
import { fileURLToPath } from "url";
import { MongoClient } from "mongodb";
import cookieParser from "cookie-parser";
import verifyToken from "./router/services/verifyToken.js";

var app = express();
var mongodb = new MongoClient(env.mongo_url);
var __dirname = dirname(fileURLToPath(import.meta.url));

(async () => {
  try {
    await mongodb.connect();
    app.listen(env.PORT, env.HOST, () =>
      console.log(`The server is running on ${env.HOST}:${env.PORT}`)
    );

    var db = mongodb.db("database");
    var itemCollection = db.collection("itemCollection");
    var collection = db.collection("users");
    app.locals.itemCollection = itemCollection;
    app.locals.collection = collection;

    var adminDB = mongodb.db("admin");
    var adminCollection = adminDB.collection("adminData");
    app.locals.adminCollection = adminCollection;
  } catch (err) {
    console.log(err);
  }
})();

import { root } from "./router/root/root.js";
import { xlsx } from "./router/xlsx/xlsx.js";
import { auth } from "./router/auth/auth.js";
import { image } from "./router/img/image.js";
import { itemId } from "./router/itemId/itemId.js";
import { botApi } from "./router/botApi/botApi.js";
import { userPath } from "./router/userOrder/userOrder.js";
import { itemStatus } from "./router/itemStatus/itemStatus.js";
import { download } from "./router/downloadFile/downloadFile.js";
import { orderStatus } from "./router/orderStatus/orderStatus.js";

app.use(
  helmet.contentSecurityPolicy({
    useDefaults: true,
    directives: { "img-src": ["'self'", "https: data:"] },
  })
);

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(join(__dirname, "public")));

app.use("/auth", auth);
app.use("/bot", botApi);

app.use(cookieParser());
app.use(verifyToken);

app.use("/", root);
app.use("/xlsx", xlsx);
app.use("/image", image);
app.use("/itemid", itemId);
app.use("/download", download);
app.use("/orderinfo", userPath);
app.use("/status", orderStatus);
app.use("/itemstatus", itemStatus);
