export default function openImage(userId, orderId) {
  const buttonForOpenPhoto = document.createElement("button");
  buttonForOpenPhoto.append("Открыть");

  const form = document.createElement("form");
  form.action = `/image/${userId}/${orderId}`;
  form.id = orderId;
  form.target = "_blank";
  form.append(buttonForOpenPhoto);

  const td = document.createElement("td");
  td.append(form);

  return td;
}
