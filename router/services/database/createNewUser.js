export default async function createNewUser(collection, order) {
  return await collection.insertOne({
    userId: order.userId,
    firstName: order.firstName,
    userName: order.userName,
    orders: [],
  });
}
