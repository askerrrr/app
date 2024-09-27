import compress from "./compress.js";
import convertToBuffer from "./convertFileToBuffer.js";

async function convertDataToBufferAndCompress(url, orderFiles, id) {
  try {
    const buffer = await convertToBuffer(url);
    const compressedFile = await compress(buffer);
    console.log(buffer);
    if (compressedFile) {
      await orderFiles.updateOne(
        { tgId: id, "files.fileContent.url": url },
        {
          $set: { "files.$.fileContent.binary": compressedFile },
        }
      );
    }
  } catch (err) {
    console.log(err);
  }
}

export default convertDataToBufferAndCompress;
