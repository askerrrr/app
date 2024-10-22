export default async function formForSetOrderStatus(userId, fileId) {
  const button = document.getElementById("submit-order-status");

  button.addEventListener("click", async (e) => {
    e.preventDefault();

    let orderStatus = document.querySelector(
      "input[name=order-status]:checked"
    ).value;

    const response = await fetch(`/status/${userId}/${fileId}/${orderStatus}`, {
      method: "POST",
      headers: { Accept: "application/json" },
    });

    return response;
  });
  return button;
}
