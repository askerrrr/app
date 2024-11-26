export default function createId(orderId) {
  const orderLink = document.createElement("form");
  orderLink.action = `/orderinfo/orders/order/${orderId}`;

  const button = document.createElement("button");
  button.append(orderId);

  orderLink.append(button);

  const td = document.createElement("td");
  td.append(orderLink);

  return td;
}
