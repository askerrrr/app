import fs from "fs";
import db from "../database/db.js";

export default async function deleteOrderFile(userId, fileId, collection) {
  try {
    const filePath = await db.findFilePath(userId, fileId, collection);

    return fs.rm(filePath, (err) => {
      if (err) {
        console.log(err);
      }
    });
  } catch (err) {
    console.log(err);
  }
}
