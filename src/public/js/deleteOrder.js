var deleteOrder = async (userId, orderId) => {
  try {
    var url = "/orderinfo/api/delete/" + userId + "/" + orderId;

    var response = await fetch(url, {
      method: "DELETE",
      headers: { Accept: "application/json" },
    });

    return response.status;
  } catch (err) {
    console.log(err);
  }
};

export default deleteOrder;
