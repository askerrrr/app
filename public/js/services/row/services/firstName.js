export default function getFirstName(firstName) {
  const tdFirstName = document.createElement("td");
  tdFirstName.append(firstName);

  return tdFirstName;
}
