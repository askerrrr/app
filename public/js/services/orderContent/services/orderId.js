export default function renderOrderId(orders) {
  const td = document.createElement("td");
  td.append(orders.order.file.id);

  return td;
}
