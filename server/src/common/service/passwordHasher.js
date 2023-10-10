const bcrypt = require("bcrypt");
const saltRounds = 10;

exports.hash = async (password) => {
  const salt = bcrypt.genSaltSync(saltRounds);
  const hashedPassword = bcrypt.hashSync(password, salt);

  return hashedPassword;
};

exports.verify = async (password, hashedPassword) => {
  const result = bcrypt.compareSync(password, hashedPassword);
  return result;
};
