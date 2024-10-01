function createId(order) {
  const orderLink = document.createElement("a");
  orderLink.href = `/orderinfo/orders/order/${order.orderContent.file.id}`;

  const button = document.createElement("button");
  button.append(`${order.orderContent.file.id}`);

  orderLink.append(button);

  const td = document.createElement("td");
  td.append(orderLink);

  return td;
}

export default createId;
