export default function backToOrder(userId, orderId) {
  var btn = document.createElement("button");
  btn.append("Назад");

  var form = document.createElement("form");

  form.append(btn);
  form.className = "backToOrders";
  form.action = `/orderinfo/orders/order/${orderId}`;

  return form;
}
