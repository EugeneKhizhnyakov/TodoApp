const jwt = require('jsonwebtoken');
const config = require('config');

module.exports = (req, res, next) =>{
    if(req.method==='OPTIONS'){
        return next();
    }

    try{
        const token = req.headers.authorization.split(' ')[1];
        
        if(!token){
            res.status(401).json({message: "not auth"});
        }

        const decoded = jwt.verify(token, config.get('jwtKey'));   

        req.user = decoded;
        next();
    }catch (e){
        res.status(401).json({message: "not auth"});
    }
}