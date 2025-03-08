import { rm } from "fs/promises";
import db from "../../../database/db.js";

var deleteOrderFile = async (userId, fileId, collection) => {
  var filePath = await db.findFilePath(userId, fileId, collection);

  try {
    await rm(filePath);
    return true;
  } catch (err) {
    if (err.code == "ENOENT") {
      return false;
    } else {
      throw err;
    }
  }
};

export default deleteOrderFile;
