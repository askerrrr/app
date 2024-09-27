import decompressAndConvertBufferToBase64 from "./decompressAndConvertBufferToBase64.js";

async function getBufferOrString(data) {
  try {
    for (const files of data) {
      const fileContent = files.fileContent;

      if (fileContent.hasOwnProperty(binary)) {
        const base64 = await decompressAndConvertBufferToBase64(
          fileContent.binary
        );
        return base64;
      } else if (!fileContent.hasOwnProperty(binary)) {
        return fileContent.url;
      }
    }
    return null;
  } catch (err) {
    console.log(err);
  }
}

export default getBufferOrString; //export to userOrder
