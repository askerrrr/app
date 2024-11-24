const { open } = require("fs/promises");

export default async function writeFile(path, data) {
  let fileHandle;

  try {
    fileHandle = await open(path, "w");
    const writableStream = fileHandle.createWriteStream();

    let chunk;

    for await (chunk of data) {
      writableStream.write(chunk);
    }

    writableStream.on("error", (err) => console.log(err));

    writableStream.end();
  } catch (err) {
    console.log(err);
  } finally {
    await fileHandle?.close();
  }
}
