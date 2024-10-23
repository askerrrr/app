import saveOrderStatus from "./saveOrderStatus.js";

export default async function formForOpenPopUp(userId, fileId) {
  const button = document.createElement("button");
  button.className = "change-order-status";
  button.append("Изменить статут заказа");

  button.addEventListener("click", async (e) => {
    e.preventDefault();
    await saveOrderStatus(userId, fileId);
    button.onclick = window.dialog.showModal();
  });

  const form = document.createElement("form");
  form.append(button);

  return form;
}
