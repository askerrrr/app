import compress from "./compress.js";
import convertToBuffer from "./convertFileToBuffer.js";

async function convertDataToBufferAndCompress(url, collection, id) {
  try {
    const buffer = await convertToBuffer(url);
    const compressedFile = await compress(buffer);

    await collection.updateOne(
      { tgId: id, "orders.order.file.url": url },
      {
        $set: { "orders.$.order.file.binary": compressedFile },
      }
    );
  } catch (err) {
    console.log(err);
  }
}

export default convertDataToBufferAndCompress;
