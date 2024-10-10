import fs from "fs";
import path from "path";

async function getUserDir(id) {
  try {
    const userDir = path.join("/var", "www", "userFiles", `${id}`);

    if (!fs.existsSync(userDir)) {
      await fs.promises.mkdir(userDir, { recursive: true });
      console.log(`Папка ${id} успешно создана...`);
    } else {
      console.log(`Папка ${id} уже существует...`);
    }
    return userDir;
  } catch (err) {
    console.log(`Ошибка при создании папки ${id}`, err);
  }
}

export default getUserDir;
