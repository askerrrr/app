export default function createId(orderId) {
  var button = document.createElement("button");
  button.append(orderId);

  var orderLink = document.createElement("form");

  orderLink.append(button);
  orderLink.action = `/orderinfo/orders/order/${orderId}`;

  var td = document.createElement("td");
  td.append(orderLink);

  return td;
}
