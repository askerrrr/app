function getTelegramId(user) {
  const telegramIdLink = document.createElement("a");
  telegramIdLink.href = `/orderinfo/orders/${user.tgId}`;

  const buttontoId = document.createElement("button");
  buttontoId.append(`${user.tgId}`);

  telegramIdLink.append(buttontoId);

  const tdTelegramId = document.createElement("td");
  tdTelegramId.append(telegramIdLink);
  return tdTelegramId;
}

export default getTelegramId;
