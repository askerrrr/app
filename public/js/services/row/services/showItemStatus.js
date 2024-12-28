export default async (items) => {
  var [value, status] = items.split(":::");

  var td = document.createElement("td");

  td.append(status);

  return td;
};
