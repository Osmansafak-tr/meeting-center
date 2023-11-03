const bcrypt = require("bcrypt");
const saltRounds = 10;

exports.hash = (password) => {
  const salt = bcrypt.genSaltSync(saltRounds);
  const hashedPassword = bcrypt.hashSync(password, salt);

  return hashedPassword;
};

exports.verify = (password, hashedPassword) => {
  const result = bcrypt.compareSync(password, hashedPassword);
  return result;
};
