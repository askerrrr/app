export default function getFile(orders) {
  const fileId = orders.orderContent.file.id;
  const filePath = orders.orderContent.file.pathToFile;

  const buttonForDownload = document.createElement("button");
  buttonForDownload.append("Скачать файл");

  const form = document.createElement("form");
  form.action = `/download/${filePath}`;
  form.id = fileId;
  form.append(buttonForDownload);

  const td = document.createElement("td");
  td.append(form);

  return td;
}
