import compress from "./compress.js";
import convertToBuffer from "./convertFileToBuffer.js";

async function convertDataToBufferAndCompress(url) {
  const buffer = await convertToBuffer(url);
  const compressedFile = await compress(buffer);

  await collection.updateOne(
    { tgId: id },
    {
      $set: { file: { url: compressedFile } },
    }
  );
}

export default convertDataToBufferAndCompress;
