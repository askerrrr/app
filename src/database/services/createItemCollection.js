var createItemCollection = async (user, collection) =>
  await collection.insertOne({ userId: user.userId, orders: [] });

export default createItemCollection;
