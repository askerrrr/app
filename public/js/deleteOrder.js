async function deleteOrder(userId, orderId) {
  try {
    const response = await fetch(`/orderinfo/delete/${userId}/${orderId}`, {
      method: "DELETE",
      headers: { Accept: "application/json" },
    });
    if (!response.ok) {
      console.log("!res.ok");
    }
    return await response.json();
  } catch (err) {
    console.log(err);
  }
}

export default deleteOrder;
