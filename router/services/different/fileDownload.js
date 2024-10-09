import fs from "fs";
import path from "path";
import getBuffer from "./getBuffer";

async function downloadFile(url) {
  const buffer = await getBuffer(url);
  const filePath = path.join();

  return fs.writeFile(filePath, buffer, (err) => {
    if (err) {
      return console.log(err);
    }
    console.log(err);
  });
}

export { downloadFile };
