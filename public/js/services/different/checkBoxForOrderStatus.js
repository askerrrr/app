function Status_In_Processing(id) {
  const label = document.createElement("label");
  label.for = id;

  const input = document.createElement("input");
  input.id = id;
  input.type = "checkbox";
  input.name = "order-status";
  input.value = `in-processing`;

  const div = document.createElement("div");
  div.append("взят в обработку");

  label.append(input, div);
  return label;
}

function Status_Purchased(id) {
  const label = document.createElement("label");
  label.for = id;

  const input = document.createElement("input");
  input.id = id;
  input.type = "checkbox";
  input.name = "order-status";
  input.value = `purchased`;

  const div = document.createElement("div");
  div.append("выкуплен");

  label.append(input, div);
  return label;
}

function Status_China_Warehouse(id) {
  const label = document.createElement("label");
  label.for = id;

  const input = document.createElement("input");
  input.id = id;
  input.type = "checkbox";
  input.name = "order-status";
  input.value = `china-warehouse`;

  const div = document.createElement("div");
  div.append("доставлен на склад в китае");

  label.append(input, div);
  return label;
}

function Status_On_The_Way(id) {
  const label = document.createElement("label");
  label.for = id;

  const input = document.createElement("input");
  input.id = id;
  input.type = "checkbox";
  input.name = "order-status";
  input.value = `on-the-way`;

  const div = document.createElement("div");
  div.append("товар в пути");

  label.append(input, div);
  return label;
}

function Status_Awaiting_Receipt(id) {
  const label = document.createElement("label");
  label.for = id;

  const input = document.createElement("input");
  input.id = id;
  input.type = "checkbox";
  input.name = "order-status";
  input.value = `awaiting-receipt`;

  const div = document.createElement("div");
  div.append("ожидает получения");

  label.append(input, div);
  return label;
}

function Status_Order_Is_Completed(id) {
  const label = document.createElement("label");
  label.for = id;

  const input = document.createElement("input");
  input.id = id;
  input.type = "checkbox";
  input.name = "order-status";
  input.value = `order-is-completed`;

  const div = document.createElement("div");
  div.append("заказ завершен");

  label.append(input, div);
  return label;
}

export default async function createCheckBoxForOrderStatus(id) {
  const form = document.getElementById("set-order-status");

  const fieldset = document.createElement("fieldset");
  fieldset.id = "fieldset";

  const legend = document.createElement("legend");
  legend.append("Статус заказа");

  fieldset.append(
    legend,
    Status_In_Processing(id),
    Status_Purchased(id + 1),
    Status_China_Warehouse(id + 2),
    Status_On_The_Way(id + 3),
    Status_Awaiting_Receipt(id + 4),
    Status_Order_Is_Completed(id + 5)
  );

  const childTeg = document.getElementById("submit-order-status");

  form.insertBefore(fieldset, childTeg);
  return form;
}
