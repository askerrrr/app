export default function buttonBack(userId) {
  const button = document.createElement("button");
  button.append("Назад");

  const form = document.createElement("form");

  form.append(button);
  form.className = "backToOrders";
  form.action = `/orderinfo/orders/${userId}`;

  return form;
}
