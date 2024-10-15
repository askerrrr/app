function getTelegramId(user) {
  const telegramIdLink = document.createElement("a");
  telegramIdLink.href = `/orderinfo/orders/${user.userId}`;

  const buttontoId = document.createElement("button");
  buttontoId.append(`${user.userId}`);

  telegramIdLink.append(buttontoId);

  const tdTelegramId = document.createElement("td");
  tdTelegramId.append(telegramIdLink);
  return tdTelegramId;
}

export default getTelegramId;
