export default function buttonBack(data) {
  const id = data.order.userId;

  const form = document.createElement("form");
  form.className = "backToOrders";
  form.action = `/orderinfo/orders/${id}`;

  const button = document.createElement("button");
  button.append("Назад");

  form.append(button);

  return form;
}
