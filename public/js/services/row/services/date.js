export default function getDate(data) {
  const date = document.createElement("td");
  date.append(data.order.date);
  return date;
}
