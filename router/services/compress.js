import zlib from "zlib";

module.exports.compress = async (buffer) => {
  return new Promise((resolve, reject) => {
    zlib.gzip(buffer, (err, buf) => {
      if (err) {
        reject(err);
      } else {
        resolve(buf);
      }
    });
  });
};
