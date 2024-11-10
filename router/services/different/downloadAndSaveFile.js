import fs from "fs";
import path from "path";
import getBuffer from "./getBuffer.js";
import getUserDir from "./getUserDir.js";

export default async function downloadAndSaveFile(id, fileId, fileUrl) {
  try {
    const buffer = await getBuffer(fileUrl);

    if (!buffer) console.log("Ошибка при конвертации в buffer");

    const orderDir = await getUserDir(id);

    if (!orderDir) console.log("Ошибка при получении папки пользователя");

    const filePath = path.join(orderDir, `${fileId}.xlsx`);

    await fs.promises
      .writeFile(filePath, buffer)
      .catch((err) => console.error(err));

    console.log(`Файл ${fileId} успешно сохранён по пути: ${orderDir}`);
  } catch (err) {
    console.log(
      `Ошибка при загрузке и сохранении файла ${fileId}. Ошибка : ${err}`
    );
  }
}
