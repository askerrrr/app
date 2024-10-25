export default function getOrderId(orders) {
  const td = document.createElement("td");
  td.append(orders.orderContent.file.id);

  return td;
}
