import decompress from "./decompress.js";
import encodingToBase64 from "./encodingToBase64.js";

async function decompressAndConvertBufferToBase64(data) {
  for (const user of data) {
    for (const order of user.orders) {
      if (order.order.file.id) {
        const decompressBuffer = await decompress(order.order.file.url);
        const base64 = await encodingToBase64(decompressBuffer);
        return base64;
      }
    }
  }
  return null;
}

export default decompressAndConvertBufferToBase64;
