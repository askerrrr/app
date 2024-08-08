const env = {};

Object.defineProperty(env, "mongo_url", {
  value: "mongodb://localhost:27017",
  writable: false,
  configurable: false,
});

Object.defineProperty(env, "auth_token", {
  value:
    "d2-/z5OEY!vOkxvyQS6G0B-U?GjzezuIMWSQtviaH!B9eGS!G5RjKVgzWEgD/a!JhYOWN4Qv/nBLbNxIlyac5IX1ubb/reBQ4A9ZhFFiy9t1MpE7!MSqv?pVtdFw9MN-TGBvBDOhx3vww1DBgIHFe6Awh!O6atjePd2Wo/CRv2N?9wJ=0yTo7PbDC-110d2yK2iKB0RX/m9nZvSAGBhA8njt3P?C=JQC36hQ11mUWuxD?S!6YDVQcXPAOTvnq!JD",
  writable: false,
  configurable: false,
});

Object.defineProperty(env, "DB_HOST", {
  value: "localhost",
  writable: false,
  configurable: false,
});

Object.defineProperty(env, "PORT", {
  value: 443 || 3000,
  writable: false,
  configurable: false,
});

Object.defineProperty(env, "DB_USER", {
  value: "root",
  writable: false,
  configurable: false,
});

module.exports = { env };
