import fs from "fs";

async function deleteUserDir(userId) {
  try {
    const dirPath = `/var/www/userFiles/${userId}`;

    return fs.rm(dirPath, { recursive: true }, (err) => {
      console.log(err);
    });
  } catch (err) {
    console.log(err);
  }
}

export default deleteUserDir;
