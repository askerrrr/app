export default function renderXLSX(userId, orderId) {
  const button = document.createElement("button");
  button.append("Открыть файл");

  const form = document.createElement("form");
  form.action = `/xlsx/${userId}/${orderId}`;
  form.append(button);

  const td = document.createElement("td");
  td.append(form);

  return td;
}
