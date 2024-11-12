import fs from "fs";
import path from "path";
import { mkdir } from "fs";

export default async function getUserDir(id) {
  const userDir = path.join("/var", "www", "userFiles", `${id}`);
  const dirNames = ["docs", "images"];

  try {
    if (!fs.existsSync(userDir)) {
      await Promise.all(
        dirNames.map((dirName) => mkdir(`${userDir}/${dirName}`))
      ).catch((err) => console.log(err));
    }
  } catch (err) {
    console.log(err);
  }

  if (!fs.existsSync(userDir)) {
    await fs.promises.mkdir(userDir, { recursive: true }, (err) => {
      if (err) {
        console.log(err);
        return;
      }

      console.log(`Папка ${id} успешно создана...`);
    });
  }

  console.log(`Папка ${id} уже существует...`);

  return userDir;
}
