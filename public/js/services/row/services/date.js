export default function renderDate(orderDate) {
  const td = document.createElement("td");
  td.append(orderDate);

  return td;
}
