import fs from "fs";
import getBuffer from "./getBuffer.js";
import getUserDir from "./getUserDir.js";

async function downloadAndSaveFile(id, url) {
  try {
    const buffer = await getBuffer(url);

    const filePath = await getUserDir(id);

    await fs.promises.writeFile(filePath, buffer);
    console.log(`Файл успешно сохранён по пути: ${filePath}`);
  } catch (err) {
    console.log(`Ошибка при загрузке и сохранении файла: ${err}`);
  }
}

export { downloadAndSaveFile };
