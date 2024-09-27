async function convertToBuffer(url) {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Запрос по url файла не удался`);
    }

    const arrayBuffer = await response.arrayBuffer();

    return Buffer.from(arrayBuffer);
  } catch (err) {
    console.log(err);
  }
}

export default convertToBuffer;
