import { rm } from "fs/promises";

var deleteUserFolder = async (userId) => {
  try {
    await rm("/var/www/userFiles/" + userId, { recursive: true });
    return true;
  } catch (err) {
    if (err.code == "ENOENT") {
      return false;
    } else {
      throw err;
    }
  }
};

export default deleteUserFolder;
