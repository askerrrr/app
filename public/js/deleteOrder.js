async function deleteOrder(userId, orderId) {
  try {
    const response = await fetch(`/orderinfo/delete/${userId}/${orderId}`, {
      method: "DELETE",
      headers: { Accept: "application/json" },
    });
    if (!response.ok) {
      console.log("!res.ok");
    }
    return response;
  } catch (err) {
    console.log(err);
  }
}

export default deleteOrder;
