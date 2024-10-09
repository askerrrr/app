async function getBuffer(url) {
  const response = await fetch(url);

  const arrayBuffer = await response.arrayBuffer();

  return Buffer.from(arrayBuffer);
}
export default getBuffer;
