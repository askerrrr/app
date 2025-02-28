import printErrMessage from "./services/different/printErrMessage.js";

var changeOrderStatus = async (userId, orderId, status) => {
  try {
    var url = "/status/" + userId + "/" + orderId + "/" + status;

    var response = await fetch(url, {
      method: "POST",
      headers: { Accept: "application/json" },
    });

    if (!response.ok) {
      var err = await response.text();
      await printErrMessage(url, err);
      return;
    }

    return response;
  } catch (err) {
    console.log(err);
  }
};

export default changeOrderStatus;
