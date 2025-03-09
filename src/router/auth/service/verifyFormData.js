import argon2 from "argon2";

var verifyFormData = async (userLogin, userPasswd, collection) => {
  try {
    var data = await collection.findOne();

    var { login, passwd } = data;

    var validLogin = await argon2.verify(login, userLogin);
    var validPasswd = await argon2.verify(passwd, userPasswd);

    return validLogin && validPasswd;
  } catch (err) {
    console.log(err);
  }
};
export default verifyFormData;
