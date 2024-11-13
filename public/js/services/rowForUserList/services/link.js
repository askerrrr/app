export default function getUserId(order) {
  const userIdLink = document.createElement("form");
  userIdLink.action = `/orderinfo/orders/${order.userId}`;

  const buttontoId = document.createElement("button");
  buttontoId.append(`${order.userId}`);

  userIdLink.append(buttontoId);

  const tdTelegramId = document.createElement("td");
  tdTelegramId.append(userIdLink);
  return tdTelegramId;
}
