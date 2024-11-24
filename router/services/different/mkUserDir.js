import { join } from "path";
import { mkdir } from "fs/promises";

export default async function mkUserDir(userId) {
  const userDir = join("/var", "www", "userFiles", `${userId}`);
  const dirs = ["docs", "images"];

  try {
    await mkdir(userDir, { recursive: true });

    await Promise.all(
      dirs.map((dir) => mkdir(`${userDir}/${dir}`, { recursive: true }))
    );

    return dirs.map((dir) => join(userDir, dir));
  } catch (err) {
    console.log(err);
  }
}