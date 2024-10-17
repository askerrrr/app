function getFirstName(user) {
  const tdFirstName = document.createElement("td");
  tdFirstName.append(user.firstName);
  return tdFirstName;
}

export default getFirstName;
