export default function createId(orderId) {
  const button = document.createElement("button");
  button.append(orderId);

  const orderLink = document.createElement("form");

  orderLink.append(button);
  orderLink.action = `/orderinfo/orders/order/${orderId}`;

  const td = document.createElement("td");
  td.append(orderLink);

  return td;
}
