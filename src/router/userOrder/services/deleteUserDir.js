import { rm } from "fs/promises";

export default async function deleteUserDir(userId) {
  try {
    var dirPath = "/var/www/userFiles/" + userId;

    await rm(dirPath, { recursive: true });
  } catch (err) {
    console.log(err);
  }
}
