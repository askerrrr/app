export default async function getFileData(url) {
  const response = await fetch(url);

  if (!response.ok) {
    const err = await response.text();
    console.log(err);
    return;
  }

  return response.body;
}
