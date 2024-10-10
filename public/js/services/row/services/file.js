export default function getFile(data) {
  const id = data.orderContent.file.id;
  const pathToFile = data.orderContent.file.pathToFile;

  const fileURL = document.createElement("a");
  fileURL.id = id;
  fileURL.href = `${pathToFile}`;

  const buttonImage = document.createElement("button");
  buttonImage.append("file.xlsx");
  fileURL.append(buttonImage);

  const file = document.createElement("td");
  file.append(fileURL);
  return file;
}
