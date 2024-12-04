export default function getUserName(userName) {
  var tdUserName = document.createElement("td");
  tdUserName.append(userName);

  return tdUserName;
}
