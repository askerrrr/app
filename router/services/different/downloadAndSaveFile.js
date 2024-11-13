import fs from "fs";
import path from "path";
import getBuffer from "./getBuffer.js";
import getUserDir from "./getUserDir.js";

export default async function downloadAndSaveFile(id, fileId, fileUrl, order) {
  try {
    const buffer = await getBuffer(fileUrl);

    if (!buffer) console.log("Ошибка при конвертации в buffer");

    const orderDir = await getUserDir(id);

    if (!orderDir) console.log("Ошибка при получении папки пользователя");

    if (order?.type) {
      const imagesPath = path.join(orderDir[1], `${fileId}.jpg`);
      await fs.promises
        .writeFile(imagesPath, buffer)
        .catch((err) => console.error(err));

      console.log(`Файл ${fileId} успешно сохранён по пути: ${imagesPath}`);
    }

    const docsPath = path.join(orderDir[0], `${fileId}.xlsx`);

    await fs.promises
      .writeFile(docsPath, buffer)
      .catch((err) => console.error(err));

    console.log(`Файл ${fileId} успешно сохранён по пути: ${docsPath}`);
  } catch (err) {
    console.log(
      `Ошибка при загрузке и сохранении файла ${fileId}. Ошибка : ${err}`
    );
  }
}
