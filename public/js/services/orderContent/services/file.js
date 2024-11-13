export default function renderFile(orders) {
  const fileId = orders.order.file.id;
  const userId = orders.order.userId;

  const buttonForDownload = document.createElement("button");
  buttonForDownload.append("Скачать файл");

  const form = document.createElement("form");
  form.action = `/download/${userId}/${fileId}`;
  form.id = fileId;
  form.append(buttonForDownload);

  const td = document.createElement("td");
  td.append(form);

  return td;
}
