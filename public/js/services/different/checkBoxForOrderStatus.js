class CheckBox {
  constructor(checkBoxId, checkBoxValue, divContent) {
    this.checkBoxId = checkBoxId;
    this.checkBoxValue = checkBoxValue;
    this.divContent = divContent;
  }

  newCheckBox() {
    const label = document.createElement("label");
    label.for = this.checkBoxId;

    const input = document.createElement("input");
    input.id = this.checkBoxId;
    input.type = "checkbox";
    input.name = "order-status";
    input.value = this.checkBoxValue;

    const div = document.createElement("div");
    div.append(this.divContent);

    label.append(input, div);
    return label;
  }
}

export default async function createCheckBoxForOrderStatus(id) {
  const form = document.getElementById("set-order-status");

  const fieldset = document.createElement("fieldset");
  fieldset.id = "fieldset";
  const legend = document.createElement("legend");

  const Status_In_Processing = new CheckBox(
    1,
    "in-processing",
    "взят в обработку"
  ).newCheckBox();

  const Status_Purchased = new CheckBox(
    2,
    "purchased",
    "выкуплен"
  ).newCheckBox();

  const Status_China_Warehouse = new CheckBox(
    3,
    "china-warehouse",
    'доставлен на склад в китае"'
  ).newCheckBox();

  const Status_On_The_Way = new CheckBox(
    4,
    "on-the-way",
    "товар в пути"
  ).newCheckBox();

  const Status_Awaiting_Receipt = new CheckBox(
    5,
    "awaiting-receipt",
    "ожидает получения"
  ).newCheckBox();

  const Status_Order_Is_Completed = new CheckBox(
    6,
    "order-is-completed",
    "заказ завершен"
  ).newCheckBox();

  fieldset.append(
    legend,
    Status_In_Processing,
    Status_Purchased,
    Status_China_Warehouse,
    Status_On_The_Way,
    Status_Awaiting_Receipt,
    Status_Order_Is_Completed
  );

  legend.append("Статус заказа");

  const childTeg = document.getElementById("submit-order-status");

  form.insertBefore(fieldset, childTeg);

  return form;
} //export to public/js/services/different/formForOpenPopUp.js
