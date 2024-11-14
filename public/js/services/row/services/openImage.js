export default function openImage(userId, fileId) {
  const buttonForOpenPhoto = document.createElement("button");
  buttonForOpenPhoto.append("Открыть");

  const form = document.createElement("form");
  form.action = `/image/${userId}/${fileId}`;
  form.id = fileId;
  form.target = "_blank";
  form.append(buttonForOpenPhoto);

  const td = document.createElement("td");
  td.append(form);

  return td;
}
