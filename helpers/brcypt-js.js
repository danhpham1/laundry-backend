const bcryptJS = require('bcryptjs');
const saltRounds = 10;

module.exports.hashPassword = (password) => {
    const salt = bcryptJS.genSaltSync(saltRounds);
    const hashPassword = bcryptJS.hashSync(password, salt);
    return hashPassword;
}

module.exports.checkPassword = (password, hash) => {
    return bcryptJS.compareSync(password, hash);
}