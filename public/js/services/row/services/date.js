export default function renderDate(orders) {
  const td = document.createElement("td");
  td.append(orders.orderContent.date);

  return td;
}
