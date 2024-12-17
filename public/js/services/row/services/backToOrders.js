export default function backToOrders(userId) {
  var btn = document.createElement("button");
  btn.append("Назад");

  var form = document.createElement("form");

  form.append(btn);
  form.className = "backToOrders";
  form.action = `/orderinfo/orders/${userId}`;

  return form;
}
