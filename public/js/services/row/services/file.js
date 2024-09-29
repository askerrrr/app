import checkFileType from "./checkFileType.js";

export default function getFile(data) {
  const id = data.orderContent.file.id;
  const url = data.orderContent.file.url;
  const result = checkFileType(url);

  const fileURL = document.createElement("a");
  fileURL.id = id;
  fileURL.target = "_blank";
  fileURL.href = `${data.orderContent.file.url}`;

  const buttonImage = document.createElement("button");
  buttonImage.append(result);
  fileURL.append(buttonImage);

  const image = document.createElement("td");
  image.append(fileURL);
  return image;
}
