export default async function backToOrder(userId, orderId) {
  var btn = document.createElement("button");
  btn.append("Назад");

  var form = document.createElement("form");

  form.append(button);
  form.className = "backToOrders";
  form.action = `/orderinfo/orders/order/${userId}/${orderId}`;

  return form;
}
