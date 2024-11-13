export default function openPhoto(orders) {
  const fileId = orders.order.file.id;
  const userId = orders.order.userId;

  const buttonForOpenPhoto = document.createElement("button");
  buttonForOpenPhoto.append("Открыть");

  const form = document.createElement("form");
  form.action = `/image/${userId}/${fileId}`;
  form.id = fileId;
  form.append(buttonForOpenPhoto);

  const td = document.createElement("td");
  td.append(form);

  return td;
}
