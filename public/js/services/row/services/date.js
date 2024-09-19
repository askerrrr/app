export default function getDate(data) {
  const date = document.createElement("td");
  date.append(data.userOrder.date);
  return date;
}
