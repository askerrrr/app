export default function renderDescription(orders) {
  const description = `Количество : ${orders.order.file.description.quantity}Размер : ${orders.order.file.description.size}`;

  const td = document.createElement(description);
  td.append("a");
  return td;
}
