import { rm } from "fs/promises";
import db from "../../../database/db.js";

var deleteOrderFile = async (filePath) => {
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
