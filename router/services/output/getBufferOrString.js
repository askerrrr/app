import decompressAndConvertBufferToBase64 from "./decompressAndConvertBufferToBase64.js";

async function getBufferOrString(data) {
  try {
    let binary = data.files.map((files) => files.fileContent.binary).join("");
    if (binary) {
      return await decompressAndConvertBufferToBase64(binary);
    } else {
      return binary;
    }
  } catch (err) {
    console.log(err);
  }
}

export default getBufferOrString; //export to userOrder
