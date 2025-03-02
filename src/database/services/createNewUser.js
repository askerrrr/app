var createNewUser = async (order, collection) => {
  return await collection.insertOne({
    userId: order.userId,
    firstName: order.firstName,
    userName: order.userName,
    orders: [],
  });
};

export default createNewUser;
