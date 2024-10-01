export default function getFile(data) {
  const id = data.orderContent.file.id;
  const url = data.orderContent.file.url;

  const fileURL = document.createElement("a");
  fileURL.id = id;
  fileURL.href = `${url}`;

  const buttonImage = document.createElement("button");
  buttonImage.append("https://docs.google");
  fileURL.append(buttonImage);

  const file = document.createElement("td");
  file.append(fileURL);
  return file;
}
