export default function getUserName(user) {
  const tdUserName = document.createElement("td");
  tdUserName.append(user.userName);
  return tdUserName;
}
