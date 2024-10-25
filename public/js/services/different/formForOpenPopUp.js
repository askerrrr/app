import saveOrderStatus from "./saveOrderStatus.js";
import createCheckBoxForOrderStatus from "./checkBoxForOrderStatus.js";

export default async function formForOpenPopUp(userId, fileId) {
  fileId = +fileId;
  const button = document.createElement("button");
  button.className = "change-order-status";
  button.textContent = "Изменить статут заказа";

  button.addEventListener("click", async (e) => {
    e.preventDefault();

    const checkbox = await createCheckBoxForOrderStatus(fileId);

    if (checkbox) {
      await saveOrderStatus(userId, fileId);

      window.dialog.showModal();
    } else {
      throw new Error("CheckBox is not created");
    }
  });

  const form = document.createElement("form");
  form.append(button);

  return form;
}
