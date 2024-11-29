export default function getUserName(userName) {
  const tdUserName = document.createElement("td");
  tdUserName.append(userName);

  return tdUserName;
}
