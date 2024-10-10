import fs from "fs";
import getBuffer from "./getBuffer.js";
import getUserDir from "./getUserDir.js";

async function downloadAndSaveFile(id, fileId, fileUrl) {
  try {
    const buffer = await getBuffer(url);
    if (buffer) {
      const orderDir = await getUserDir(id);

      if (orderDir) {
        const filePath = path.join(orderDir, `${fileId}.xlsx`);

        await fs.promises.writeFile(filePath, buffer);

        console.log(`Файл успешно сохранён по пути: ${orderDir}`);
      }
    }
  } catch (err) {
    console.log(`Ошибка при загрузке и сохранении файла: ${err}`);
  }
}

export { downloadAndSaveFile };
