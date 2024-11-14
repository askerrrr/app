export default async function getBuffer(url) {
  try {
    const response = await fetch(url);

    if (!response.ok) {
      const err = await response.text();
      console.log(err);
      return;
    }

    const arrayBuffer = await response.arrayBuffer();

    return Buffer.from(arrayBuffer);
  } catch (err) {
    console.log(err);
  }
}
