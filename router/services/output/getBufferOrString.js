import decompressAndConvertBufferToBase64 from "./decompressAndConvertBufferToBase64.js";

async function getBufferOrString(data) {
  try {
    for (const file of data.files) {
      const { binary, url } = file.fileContent;

      if (binary) {
        return await decompressAndConvertBufferToBase64(binary);
      }

      return url;
    }
    return null;
  } catch (err) {
    console.log(err);
  }
}

export default getBufferOrString; //export to userOrder
