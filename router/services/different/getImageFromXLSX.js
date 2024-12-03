import JSZip from "jszip";
import { readFile } from "fs/promises";

export default async function getImageFromXLSX(filePath) {
  try {
    var fileData = await readFile(filePath);

    var zip = await JSZip.loadAsync(fileData);

    var mediaFiles = Object.keys(zip.files).filter((fileName) =>
      fileName.startsWith("xl/media/")
    );

    if (mediaFiles.length === 0) return;

    var buffer = await Promise.all(
      mediaFiles.map(
        async (fileName) => await zip.files[fileName].async("nodebuffer")
      )
    );
    var base64 = buffer.map((buf) => Buffer.from(buf).toString("base64"));

    return base64;
  } catch (err) {
    console.log(err);
  }
}
