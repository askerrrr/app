export default function renderCurrentOrderStatus(status) {
  const td = document.createElement("td");
  let currentStatus = status.split(":")[0];

  switch (currentStatus) {
    case "not-accepted-for-processing":
      currentStatus === "not-accepted-for-processing";
      td.append("Не взят в обработку");
      break;
    case "in-processing":
      currentStatus === "in-processing";
      td.append("Взят в обработку");
      break;
    case `purchased`:
      currentStatus === `purchased`;
      td.append("Выкуплен");
      break;
    case "china-warehouse":
      currentStatus === "china-warehouse";
      td.append("Прибыл на склад в Китае");
      break;
    case `on-the-way`:
      currentStatus === `on-the-way`;
      td.append("В пути в Москву");
      break;
    case `awaiting-receipt`:
      currentStatus === `awaiting-receipt`;
      td.append("Ожидает получения");
      break;
    case "order-is-completed":
      currentStatus === "order-is-completed";
      td.append("Завершен");
      break;
  }
  return td;
}
