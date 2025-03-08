import env from "../../../env_var.js";

var sendDeleteUserRequest = async (userId) => {
  var response = await fetch(env.bot_server_delete_user, {
    method: "DELETE",
    body: JSON.stringify({ userId }),
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: "Bearer " + env.bearer_token,
    },
  });

  return response.status == 200;
};

export default sendDeleteUserRequest;
