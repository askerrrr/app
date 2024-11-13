import fs from "fs";
import path from "path";

export default async function getUserDir(id) {
  const userDir = path.join("/var", "www", "userFiles", `${id}`);
  const dirNames = ["docs", "images"];
  try {
    if (!fs.existsSync(userDir)) {
      const createdDir = await fs.promises.mkdir(userDir, { recursive: true });

      if (!createdDir) {
        console.log(`Ошибка при создании папки ${userDir}`);
      }

      const result = await Promise.all(
        dirNames.map((dirName) => {
          if (!fs.existsSync(path.join(userDir, dirName))) {
            return fs.promises.mkdir(
              `${userDir}/${dirName}`,
              { recursive: true },
              (err) =>
                console.log(`Ошибка при создании папок docs и images`, err)
            );
          }
        })
      );

      return result;
    }

    console.log(`Папка ${id} уже существует...`);

    return dirNames.map((dirName) => path.join(userDir, dirName));
  } catch (err) {
    console.log(err);
  }
}
