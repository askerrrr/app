export default async (user, collection) =>
  await collection.insertOne({ userId: user.userId, orders: [] });
