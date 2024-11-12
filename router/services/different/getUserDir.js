import fs from "fs";
import path from "path";

export default async function getUserDir(id) {
  const userDir = path.join("/var", "www", "userFiles", `${id}`);

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
