export default function getDate(orders) {
  const td = document.createElement("td");
  td.append(orders.orderContent.date);

  return td;
}
