import decompress from "./decompress.js";
import encodingToBase64 from "./encodingToBase64.js";

async function decompressAndConvertBufferToBase64(buffer) {
  try {
    const decompressBuffer = await decompress(buffer);
    const base64 = await encodingToBase64(decompressBuffer);
    return base64;
  } catch (err) {
    console.log(err);
  }
}

export default decompressAndConvertBufferToBase64 //export to userOrder;
