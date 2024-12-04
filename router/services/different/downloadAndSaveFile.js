import { join } from "path";
import writeFile from "./writeFile.js";
import makeUserDir from "./makeUserDir.js";
import getFileData from "./getFileData.js";

export default async function downloadAndSaveFile(userId, fileId, url, order) {
  try {
    var userDir = await makeUserDir(userId);

    var docsPath = join(userDir[0], `${fileId}.xlsx`);
    var imagesPath = join(userDir[1], `${fileId}.jpg`);

    var dataStream = await getFileData(url);

    return order?.type
      ? await writeFile(imagesPath, dataStream)
      : await writeFile(docsPath, dataStream);
  } catch (err) {
    console.log(`Error loading and saving the file ${fileId}. Error : ${err}`);
  }
}
