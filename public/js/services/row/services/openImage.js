export default function openImage(userId, orderId) {
  var buttonForOpenPhoto = document.createElement("button");
  buttonForOpenPhoto.append("Открыть");

  var form = document.createElement("form");

  form.id = orderId;
  form.target = "_blank";
  form.append(buttonForOpenPhoto);
  form.action = `/image/${userId}/${orderId}`;

  var td = document.createElement("td");
  td.append(form);

  return td;
}
