async function checkBufferOrString(json) {
  try {
    if (json.binary) {
      const base64 = json.binary;
      const image = `<img src='data:image/jpeg;base64,${base64}'/>`;
      const body = document.getElementById("img");

      body.innerHTML = image;
      return body;
    } else if (json.url) {
      return json.url;
    }
  } catch (err) {
    console.log(err);
  }
}

export default checkBufferOrString;
