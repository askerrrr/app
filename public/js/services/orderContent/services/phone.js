export default function renderPhone(orders) {
  const td = document.createElement("td");
  td.append(orders.order.phone);
  return td;
}
