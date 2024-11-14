export default function renderDownloadLink(userId, fileId) {
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
