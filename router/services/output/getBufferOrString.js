import decompressAndConvertBufferToBase64 from "./decompressAndConvertBufferToBase64.js";

async function getBufferOrString(data) {
  try {
    for (const user of data) {
      for (const order of user.orders) {
        if (Buffer.isBuffer(order.orderContent.file.binary)) {
          const base64 = await decompressAndConvertBufferToBase64(
            order.order.file.binaryы
          );
          return base64;
        } else if (typeof order.orderContent.file.url === "string") {
          return order.orderContent.file.url;
        }
      }
    }
    return null;
  } catch (err) {
    console.log(err);
  }
}

export default getBufferOrString; //export to userOrder
