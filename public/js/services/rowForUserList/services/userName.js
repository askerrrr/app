export default function getUserName(order) {
  const tdUserName = document.createElement("td");
  tdUserName.append(order.userName);
  return tdUserName;
}
