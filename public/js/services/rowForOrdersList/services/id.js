export default function createId(order) {
  const orderLink = document.createElement("form");
  orderLink.action = `/orderinfo/orders/order/${order.order.file.id}`;

  const button = document.createElement("button");
  button.append(`${order.order.file.id}`);

  orderLink.append(button);

  const td = document.createElement("td");
  td.append(orderLink);

  return td;
}
