export default async function formForOpenPopUp() {
  const button = document.createElement("button");
  button.className = "set-order-status";
  button.append("Изменить статут заказа");

  button.addEventListener("click", async (e) => {
    e.preventDefault();
    button.onclick = window.dialog.showModal();
  });

  const form = document.createElement("form");
  form.append(button);
  return form;
}
