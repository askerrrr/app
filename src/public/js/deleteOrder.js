import printErrMessage from "./services/different/printErrMessage";

var deleteOrder = async (userId, orderId) => {
  try {
    var url = "/orderinfo/api/delete/" + userId + "/" + orderId;

    var response = await fetch(url, {
      method: "DELETE",
      headers: { Accept: "application/json" },
    });

    if (!response.ok) {
      var err = await response.text();
      await printErrMessage(url, err);
      return;
    }

    window.location.href = `/orderinfo/orders/${userId}`;
  } catch (err) {
    console.log(err);
  }
};

export default deleteOrder;
