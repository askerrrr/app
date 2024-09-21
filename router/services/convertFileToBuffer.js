async function convertToBuffer(url) {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Запрос по url файла не удался`);
  }

  const blob = await response.blob();
  const arrayBuffer = await blob.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);
  return buffer;
}

export { convertToBuffer };
