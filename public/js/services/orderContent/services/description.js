export default function renderDescription(orders) {
  const description = `Количество : ${orders.order.file.description.quantity}\nРазмер : ${orders.order.file.description.size}`;

  const td = document.createElement("td");
  td.append(description);

  return td;
}
