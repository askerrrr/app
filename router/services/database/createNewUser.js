export default async function createNewUser(collection, orderContent) {
  return await collection.insertOne({
    userId: orderContent.userId,
    firstName: orderContent.firstName,
    userName: orderContent.userName,
    orders: [],
  });
}
