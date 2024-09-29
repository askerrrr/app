async function checkBufferOrString(json) {
  try {
    if (json.binary) {
      const base64 = json.binary;
      const image = `<img src='data:image/jpeg;base64,${base64}'/>`;
      const body = document.getElementById("img");
      body.innerHTML = image;
      return body;
    } else if (json.url) {
      // const fileURL = document.getElementById(json.url);
      // fileURL.href = `${json.url}`;
      const div = document.createElement("div");
      const body = document.getElementById("img");
      div.textContent = json.url;
      body.append(div);
      return body;
      //return fileURL;
    }
  } catch (err) {
    console.log(err);
  }
}

export default checkBufferOrString;
