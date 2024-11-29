export default function getImageFromXLSX(img) {
  const td = document.createElement("td");
  td.append(img);

  return td;
}
