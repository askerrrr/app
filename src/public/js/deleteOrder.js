var deleteOrder = async (userId, orderId) => {
  try {
    var url = "/orderinfo/api/delete/" + userId + "/" + orderId;

    var response = await fetch(url, {
      method: "DELETE",
      headers: { Accept: "application/json" },
    });

    return response.status == 200;
  } catch (err) {
    console.log(err);
  }
};

export default deleteOrder;
