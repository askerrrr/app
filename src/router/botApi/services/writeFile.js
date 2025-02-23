import { open } from "fs/promises";

var writeFile = async (path, data) => {
  let fileHandle;

  try {
    fileHandle = await open(path, "w");
    var writableStream = fileHandle.createWriteStream();

    let chunk;

    for await (chunk of data) {
      writableStream.write(chunk);
    }

    writableStream.on("error", (err) => console.log(path, err));
    writableStream.on("finish", () => console.log("The file is written"));

    writableStream.end();
  } catch (err) {
    console.log(err);
  } finally {
    await fileHandle?.close();
  }
};
export default writeFile;
