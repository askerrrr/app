import { rm } from "fs/promises";
import db from "../database/db.js";

export default async function deleteOrderFile(userId, fileId, collection) {
  try {
    var filePath = await db.findFilePath(userId, fileId, collection);

    await rm(filePath);
  } catch (err) {
    console.log(err);
  }
}
