export default function getFirstName(order) {
  const tdFirstName = document.createElement("td");
  tdFirstName.append(order.firstName);
  return tdFirstName;
}
