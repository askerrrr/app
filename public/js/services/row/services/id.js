export default function createId(fileId) {
  const orderLink = document.createElement("form");
  orderLink.action = `/orderinfo/orders/order/${fileId}`;

  const button = document.createElement("button");
  button.append(`${fileId}`);

  orderLink.append(button);

  const td = document.createElement("td");
  td.append(orderLink);

  return td;
}
