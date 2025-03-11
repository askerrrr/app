import env from "../../../env_var.js";

var sendDeleteOrderRequest = async (userId, orderId) => {
  var response = await fetch(env.bot_server_delete_order, {
    method: "DELETE",
    body: JSON.stringify({ userId, orderId }),
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: "Bearer " + env.bearer_token,
    },
  });

  return response.status;
};

export default sendDeleteOrderRequest;
