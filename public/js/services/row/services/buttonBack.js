export default function buttonBack(userId) {
  const form = document.createElement("form");
  form.className = "backToOrders";
  form.action = `/orderinfo/orders/${userId}`;

  const button = document.createElement("button");
  button.append("Назад");

  form.append(button);

  return form;
}
