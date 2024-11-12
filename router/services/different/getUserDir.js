import fs from "fs";
import path from "path";
import { mkdir } from "fs";

export default async function getUserDir(id) {
  const userDir = path.join("/var", "www", "userFiles", `${id}`);
  const dirNames = ["docs", "images"];

  if (!fs.existsSync(userDir)) {
    const result = await fs.promises.mkdir(userDir, { recursive: true });

    if (!result) {
      console.log(`Ошибка при создании папки ${userDir}`);
    }

    await Promise.all(
      dirNames.map((dirName) =>
        fs.promises.mkdir(`${userDir}/${dirName}`, { recursive: true }, (err) =>
          console.log(`Ошибка при создании папок docs и images`, err)
        )
      )
    );
  }

  console.log(`Папка ${id} уже существует...`);
}
