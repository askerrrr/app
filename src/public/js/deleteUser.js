var deleteUser = async (userId) => {
  try {
    var url = "/orderinfo/api/delete/" + userId;

    var response = await fetch(url, {
      method: "DELETE",
      headers: { Accept: "application/json" },
    });

    return response.status;
  } catch (err) {
    console.log(err);
  }
};

export default deleteUser;
