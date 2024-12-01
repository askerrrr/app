import saveAndRenderCurrentOrderStatus from "./saveOrderStatus.js";
import createCheckBoxForOrderStatus from "./checkBoxForOrderStatus.js";

export default async function formForOpenPopUp(userId, orderId) {
  orderId = +orderId;
  const button = document.createElement("button");
  button.className = "change-order-status";
  button.textContent = "Изменить статут заказа";

  button.addEventListener("click", async (e) => {
    e.preventDefault();

    const checkbox = await createCheckBoxForOrderStatus();

    if (checkbox) {
      await saveAndRenderCurrentOrderStatus(userId, orderId);

      window.dialog.showModal();
    } else {
      throw new Error("CheckBox is not created");
    }
  });

  const form = document.createElement("form");
  form.append(button);

  return form;
}
