export default function backToOrders(userId) {
  var button = document.createElement("button");
  button.append("Назад");

  var form = document.createElement("form");

  form.append(button);
  form.className = "backToOrders";
  form.action = `/orderinfo/orders/${userId}`;

  return form;
}
