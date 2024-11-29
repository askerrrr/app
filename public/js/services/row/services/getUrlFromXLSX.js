export default function getUrlFromXLSX(data) {
  const urlArr = [];

  for (let key in data) {
    urlArr.push(data[key].v);
  }

  const td = document.createElement("td");

  return urlArr.filter((item) => String(item).startsWith("http"));
}
