export default async function orderStatus() {
  const isOrderAccepted = document.createElement("input");
  isOrderAccepted.type = "radio";
  isOrderAccepted.value = "Заказ принят в обработку";
  isOrderAccepted.name = "isOrderAccepted";

  const isItemBought = document.createElement("input");
  isItemBought.type = "radio";
  isItemBought.value = "Товары выкуплены";

  const button = document.createElement("button");
  button.type = "submit";
  button.append("Отправить");

  const form = document.createElement("form");
  form.append(isOrderAccepted, isItemBought, button);
  return form;
}
