export default function renderDate(orders) {
  const td = document.createElement("td");
  td.append(orders.order.date);

  return td;
}
