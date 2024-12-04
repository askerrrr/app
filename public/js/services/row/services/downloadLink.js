export default function renderDownloadLink(userId, orderId) {
  var buttonForDownload = document.createElement("button");
  buttonForDownload.append("Скачать файл");

  var form = document.createElement("form");

  form.id = orderId;
  form.append(buttonForDownload);
  form.action = `/download/${userId}/${orderId}`;

  var td = document.createElement("td");
  td.append(form);

  return td;
}
