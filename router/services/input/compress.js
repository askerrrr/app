import zlib from "zlib";

async function compress(buffer) {
  return new Promise((resolve, reject) => {
    zlib.gzip(buffer, (err, buf) => {
      if (err) {
        reject(err);
      } else {
        resolve(buf);
      }
    });
  });
}

export default compress;
