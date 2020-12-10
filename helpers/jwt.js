const jwt = require('jsonwebtoken');
module.exports.privateKey = 'laundry';

module.exports.signToken = (data) =>{
    return jwt.sign({
        exp: Math.floor(Date.now() / 1000) + (60* 60),
        data:{...data}
    },this.privateKey)
}

module.exports.verifyToken = (token)=>{
    return jwt.verify(token,this.privateKey);
}