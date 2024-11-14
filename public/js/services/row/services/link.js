export default function getUserId(userId) {
  const userIdLink = document.createElement("form");
  userIdLink.action = `/orderinfo/orders/${userId}`;

  const buttontoId = document.createElement("button");
  buttontoId.append(`${userId}`);

  userIdLink.append(buttontoId);

  const tdTelegramId = document.createElement("td");
  tdTelegramId.append(userIdLink);
  return tdTelegramId;
}
