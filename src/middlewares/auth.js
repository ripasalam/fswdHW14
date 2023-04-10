const jwt = require('jsonwebtoken')


    
    const verifyToken = async(req, res, next) =>{
        const authHeader = req.headers.authorization
       
            if (authHeader){

                try {
                    const token = authHeader.split(" ")[1]
                    const user = jwt.verify(token, process.env.JWT_SECRET)
                    req.user = user;
                    next()
                } catch (error) {
                    res.status(403).json("token is invalid")
                    
                }                
            }else {
                res.status(401).json("you are not authenticated")
                
            }
    }

    module.exports = {verifyToken}




