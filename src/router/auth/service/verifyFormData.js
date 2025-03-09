import argon2 from "argon2";

var verifyFormData = async (login, passwd, collection) => {
  try {
    var data = await collection.findOne();

    var { loginHash, passwdHash } = data;

    var validLogin = await argon2.verify(loginHash, login);
    var validPasswd = await argon2.verify(passwdHash, passwd);

    return validLogin && validPasswd;
  } catch (err) {
    console.log(err);
  }
};
export default verifyFormData;
