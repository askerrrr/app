import { checkFileType } from "./checkFileType.js";

export function getFile(data) {
  const imageURL = document.createElement("a");
  const file = data.userOrder.file;
  const result = checkFileType(file);
  imageURL.href = `/orderinfo/tgId/${file}}`;
  imageURL.target = "_blank";

  const buttonImage = document.createElement("button");
  buttonImage.append(result);
  imageURL.append(buttonImage);

  const image = document.createElement("td");
  image.append(imageURL);
  return image;
}
