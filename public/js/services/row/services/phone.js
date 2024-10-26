export default function renderPhone(orders) {
  const td = document.createElement("td");
  td.append(orders.orderContent.phone);
  return td;
}
