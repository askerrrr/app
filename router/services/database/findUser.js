export default async function findUser(user, adminCollection) {
  try {
    const existingUser = await adminCollection.findOne({ user: user });

    if (existingUser) return existingUser.user;
  } catch (err) {
    console.log(err);
  }
}
