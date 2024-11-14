export default function renderOrderId(fileId) {
  const td = document.createElement("td");
  td.append(fileId);

  return td;
}
