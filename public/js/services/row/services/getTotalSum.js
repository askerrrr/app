export default async (totalSum) => {
  var td = document.createElement("td");
  td.append(totalSum || "");

  return td;
};
