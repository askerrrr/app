import fs from "fs";
import path from "path";
import getBuffer from "./getBuffer.js";
import getUserDir from "./getUserDir.js";

export default async function downloadAndSaveFile(id, fileId, fileUrl, order) {
  try {
    const buffer = await getBuffer(fileUrl);

    if (!buffer) console.log("Error converting to buffer");

    const orderDir = await getUserDir(id);

    if (!orderDir) console.log("Error receiving the user's folder");

    if (order?.type) {
      const imagesPath = path.join(orderDir[1], `${fileId}.jpg`);
      await fs.promises
        .writeFile(imagesPath, buffer)
        .catch((err) => console.error(err));

      console.log(`File ${fileId} was saved successfully: ${imagesPath}`);
    } else {
      const docsPath = path.join(orderDir[0], `${fileId}.xlsx`);

      await fs.promises
        .writeFile(docsPath, buffer)
        .catch((err) => console.error(err));

      console.log(`File ${fileId} was saved successfully: ${docsPath}`);
    }
  } catch (err) {
    console.log(`Error loading and saving the file ${fileId}. Error : ${err}`);
  }
}
