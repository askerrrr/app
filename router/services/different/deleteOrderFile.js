import fs from "fs";

async function deleteOrderFile(userId, fileId) {
  try {
    const filePath = `/var/www/userFiles/${userId}/${fileId}.xlsx`;

    return fs.rm(filePath, (err) => {
      if (err) {
        console.log(err);
      }
    });
  } catch (err) {
    console.log(err);
  }
}

export default deleteOrderFile;
