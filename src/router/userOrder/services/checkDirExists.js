import { access } from "fs/promises";

var checkFolderExists = async (folderPath) => {
  try {
    await access(folderPath);
    return true;
  } catch (err) {
    if (err.code == "ENOENT") {
      return false;
    } else {
      throw err;
    }
  }
};

export default checkFolderExists;
