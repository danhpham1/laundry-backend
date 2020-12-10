const jwtHelp = require('../helpers/jwt');

module.exports.checkTokenWithPrivateApi = async (req,res,next)=>{
    if(req.headers.authorization){
        try {
            let token = req.headers.authorization.split(' ')[1];
            jwtHelp.verifyToken(token);
            next();
        } catch (error) {
            res.status(401).json({
                success:false,
                message:"token has expired"
            })
        }
    }else{
        res.status(401).json({
            success:false,
            message:'Please request with token in headers'
        })
    }
}