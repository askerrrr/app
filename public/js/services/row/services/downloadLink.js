export default function renderDownloadLink(userId, orderId) {
  const buttonForDownload = document.createElement("button");
  buttonForDownload.append("Скачать файл");

  const form = document.createElement("form");
  form.action = `/download/${userId}/${orderId}`;
  form.id = orderId;
  form.append(buttonForDownload);

  const td = document.createElement("td");
  td.append(form);

  return td;
}
