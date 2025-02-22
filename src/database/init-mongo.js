db.getSiblingDB("admin").auth(
  process.env.MONGO_INITDB_ROOT_USERNAME,
  process.env.MONGO_INITDB_ROOT_PASSWORD
);

db.getSiblingDB("admin").createUser({
  user: process.env.MONGO_ROOT_USER,
  pwd: process.env.MONGO_ROOT_PASSWD,
  roles: ["userAdminAnyDatabase", "readWriteAnyDatabase"],
});

db.getSiblingDB("admin").createCollection("adminData");

db.getSiblingDB("admin").adminData.insertOne({
  login: process.env.HASH_LOGIN,
  passwd: process.env.HASH_PASSWD,
});
