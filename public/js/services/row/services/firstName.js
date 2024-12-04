export default function getFirstName(firstName) {
  var tdFirstName = document.createElement("td");
  tdFirstName.append(firstName);

  return tdFirstName;
}
