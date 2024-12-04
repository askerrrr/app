export default function getUserId(userId) {
  var buttontoId = document.createElement("button");
  buttontoId.append(userId);

  var userIdLink = document.createElement("form");

  userIdLink.method = "GET";
  userIdLink.append(buttontoId);
  userIdLink.action = `/orderinfo/orders/${userId}`;

  var tdTelegramId = document.createElement("td");
  tdTelegramId.append(userIdLink);

  return tdTelegramId;
}
