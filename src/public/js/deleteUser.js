var deleteUser = async (userId) => {
  try {
    var url = "/orderinfo/api/delete/" + userId;

    var response = await fetch(url, {
      method: "DELETE",
      headers: { Accept: "application/json" },
    });

    return response.status == 200;
  } catch (err) {
    console.log(err);
  }
};

export default deleteUser;
