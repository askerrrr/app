function getUserId(user) {
  const userIdLink = document.createElement("a");
  userIdLink.href = `/orderinfo/orders/${user.userId}`;

  const buttontoId = document.createElement("button");
  buttontoId.append(`${user.userId}`);

  userIdLink.append(buttontoId);

  const tdTelegramId = document.createElement("td");
  tdTelegramId.append(userIdLink);
  return tdTelegramId;
}

export default getUserId;
