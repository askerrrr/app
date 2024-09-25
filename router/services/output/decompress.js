import zlib from "zlib";

async function decompress(buffer) {
  return new Promise((resolve, reject) => {
    zlib.unzip(buffer, (err, buf) => {
      if (err) {
        reject(err);
      } else {
        resolve(buf);
      }
    });
  });
}

export default decompress;
