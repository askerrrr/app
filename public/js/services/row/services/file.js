import checkFileType from "./checkFileType.js";

export default function getFile(data) {
  const imageURL = document.createElement("a");
  const fileId = data.fileContent.file.id;
  const fileURL = data.fileContent.file.url;
  const result = checkFileType(fileURL);
  imageURL.href = `/orderinfo/data/tgId/${fileId}}`;
  imageURL.target = "_blank";

  const buttonImage = document.createElement("button");
  buttonImage.append(result);
  imageURL.append(buttonImage);

  const image = document.createElement("td");
  image.append(imageURL);
  return image;
}
