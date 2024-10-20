export default function createId(order) {
  const orderLink = document.createElement("form");
  orderLink.action = `/orderinfo/orders/order/${order.orderContent.file.id}`;

  const button = document.createElement("button");
  button.append(`${order.orderContent.file.id}`);

  orderLink.append(button);

  const td = document.createElement("td");
  td.append(orderLink);

  return td;
}
