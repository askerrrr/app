export default function getUserId(userId) {
  const buttontoId = document.createElement("button");
  buttontoId.append(userId);

  const userIdLink = document.createElement("form");

  userIdLink.method = "GET";
  userIdLink.append(buttontoId);
  userIdLink.action = `/orderinfo/orders/${userId}`;

  const tdTelegramId = document.createElement("td");
  tdTelegramId.append(userIdLink);

  return tdTelegramId;
}
