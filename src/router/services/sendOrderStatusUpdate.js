import env from "../../env_var.js";

var sendOrderStatusUpdate = async (userId, orderId, orderStatus) => {
  var response = await fetch(env.bot_server_ip, {
    method: "PATCH",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${env.bearer_token}`,
    },
    body: JSON.stringify({
      userId,
      orderId,
      orderStatus,
    }),
  });

  if (!response.ok) {
    var err = await response.text();
    console.log("Ошибка при отправлении статуса боту: ", err);
    return;
  }
};

export default sendOrderStatusUpdate;
