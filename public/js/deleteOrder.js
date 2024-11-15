export default async function deleteOrder(userId, orderId) {
  try {
    const response = await fetch(`/orderinfo/api/delete/${userId}/${orderId}`, {
      method: "DELETE",
      headers: { Accept: "application/json" },
    });

    if (!response.ok) {
      const err = await response.text();
      console.log(err);
      return;
    }

    window.location.href = `/orderinfo/orders/${userId}`;
    return response;
  } catch (err) {
    console.log(err);
  }
}
