export default function buttonBack(data) {
  const id = data.orderContent.tgId;

  const a = document.createElement("a");
  a.className = "backToOrders";
  a.href = `/orderinfo/orders/${id}`;

  const button = document.createElement("button");
  button.append("Назад");

  a.append(button);

  return a;
}
