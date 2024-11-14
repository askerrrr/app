import fs from "fs";
import path from "path";

export default async function getUserDir(id) {
  const userDir = path.join("/var", "www", "userFiles", `${id}`);
  const dirNames = ["docs", "images"];
  try {
    await fs.promises.mkdir(userDir, { recursive: true });

    await Promise.all(
      dirNames.map((dirName) =>
        fs.promises.mkdir(`${userDir}/${dirName}`, { recursive: true })
      )
    );

    return dirNames.map((dirName) => path.join(userDir, dirName));
  } catch (err) {
    console.log(err);
  }
}
