export default function getDate(data) {
  const date = document.createElement("td");
  date.append(data.orderContent.date);
  return date;
}
