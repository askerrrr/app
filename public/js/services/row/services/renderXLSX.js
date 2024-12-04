export default function renderXLSX(userId, orderId) {
  var button = document.createElement("button");
  button.append("Открыть файл");

  var form = document.createElement("form");
  form.action = `/xlsx/${userId}/${orderId}`;
  form.append(button);

  var td = document.createElement("td");
  td.append(form);

  return td;
}
