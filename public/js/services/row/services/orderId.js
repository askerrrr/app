export default function renderOrderId(orderId) {
  const td = document.createElement("td");
  td.append(orderId);

  return td;
}
