export default function createDate(order) {
  const orderLink = document.createElement("a");
  orderLink.href = `/orderinfo/orders/order/${order.order.file.id}`;

  const button = document.createElement("button");
  button.append(`${order.order.date}`);

  orderLink.append(button);

  const td = document.createElement("td");
  td.append(orderLink);

  return td;
}
