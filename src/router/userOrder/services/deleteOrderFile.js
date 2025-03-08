import { rm } from "fs/promises";
import db from "../../../database/db.js";
import checkFileExists from "../../xlsx/services/checkFileExists.js";

var deleteOrderFile = async (userId, fileId, collection) => {
  try {
    var filePath = await db.findFilePath(userId, fileId, collection);

    await rm(filePath);

    var fileIsExists = await checkFileExists(filePath);

    return fileIsExists == false;
  } catch (err) {
    console.log(err);
  }
};

export default deleteOrderFile;
