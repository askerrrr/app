import deleteOrder from "../../../deleteOrder.js";

export default async function formForDeleteOrder(userId, fileId, orders) {
  const button = document.createElement("button");
  button.type = "submit";
  button.append("Удалить");

  button.addEventListener("click", async (e) => {
    e.preventDefault();

    const tbody = document.getElementById(fileId);

    const table = document.getElementById("table");
    table.removeChild(tbody);

    alert("Заказ был удален!");

    if (orders.length >= 2) {
      window.location.href = `/orderinfo/orders/${userId}`;
    }
    window.location.href = `/orderinfo/users`;

    return deleteOrder(userId, fileId);
  });

  const form = document.createElement("form");
  form.action = `/orderinfo/delete/${userId}/${fileId}`;
  form.className = "form-for-delete-order";
  form.append(button);

  return form;
}