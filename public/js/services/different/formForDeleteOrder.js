import deleteOrder from "../../deleteOrder.js";

export default async function createDeleteOrderForm(userId, orderId, orders) {
  const button = document.createElement("button");
  button.type = "submit";
  button.append("Удалить");

  button.addEventListener("click", async (e) => {
    e.preventDefault();

    const confirmDeletion = confirm("Удалить?");

    if (!confirmDeletion) return;

    const tbody = document.getElementById(orderId);

    const table = document.getElementById("table");
    table.removeChild(tbody);

    alert("Заказ был удален!");

    return deleteOrder(userId, orderId);
  });

  const form = document.createElement("form");
  form.action = `/orderinfo/delete/${userId}/${orderId}`;
  form.className = "form-for-delete-order";
  form.append(button);

  return form;
}
