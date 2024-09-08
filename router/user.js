const { env } = require("../env_var");
const express = require("express");
const router = express.Router();
const MongoClient = require("mongodb").MongoClient;
const mongodb = new MongoClient(env.mongo_url);

(async () => {
  try {
    await mongodb.connect();
    const db = mongodb.db("TelegramUsers");
    const collection = db.collection("users");
    app.locals.collection = collection;
  } catch (err) {
    console.log(err);
  }
})();

router.use(express.json());

router.get(`/user`, async (req, res) => {
  try {
    const collection = req.app.locals.collection;
    const user = await collection.findOne({}, { tgId: tgId }).toArray();
    return res.json(user);
  } catch {
    return res.status(500);
  }
});

module.exports = router;
