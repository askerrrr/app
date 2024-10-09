async function getBuffer(url) {
  try {
    const response = await fetch(url);

    const arrayBuffer = await response.arrayBuffer();

    return Buffer.from(arrayBuffer);
  } catch (err) {
    console.log(err);
  }
}
export default getBuffer;
