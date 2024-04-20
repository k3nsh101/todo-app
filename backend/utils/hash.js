const bcrypt = require("bcrypt");

const saltRounds = 10000;

exports.hashPassword = (password) => {
    const salt = bcrypt.genSaltSync(saltRounds);
    return bcrypt.hashSync(password, salt);
};

exports.comparePassword = (plain, hashed) => {
    return bcrypt.compareSync(plain, hashed);
}