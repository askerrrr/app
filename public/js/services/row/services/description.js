export default function renderDescription(description) {
  const td = document.createElement("td");
  td.append(
    `Количество : ${description.quantity}\nРазмер : ${description.size}`
  );

  return td;
}
