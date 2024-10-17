export default function getPhone(orders) {
  const td = document.createElement("td");
  td.append(orders.orderContent.phone);
  return td;
}
