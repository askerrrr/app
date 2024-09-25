import decompressAndConvertBufferToBase64 from "./decompressAndConvertBufferToBase64.js";

async function getBufferOrString(data) {
  for (const user of data) {
    for (const order of user.orders) {
      if (Buffer.isBuffer(order.order.file.url)) {
        const base64 = await decompressAndConvertBufferToBase64(
          order.order.file.url
        );
        return base64;
      } else if (typeof order.order.file.url === "string") {
        return order.order.file.url;
      }
    }
  }
  return null;
}

export default getBufferOrString;
