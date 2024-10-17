async function deleteUser(userId) {
  try {
    const response = await fetch(`/orderinfo/delete/${userId}`, {
      method: "DELETE",
      headers: { Accept: "application/json" },
    });

    return response;
  } catch (err) {
    console.log(err);
  }
}

export default deleteUser;
