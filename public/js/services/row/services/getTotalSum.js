export default async (totalSum) => {
  var td = document.createElement("td");
  td.style.color = "red";
  td.append(totalSum || "");

  return td;
};
