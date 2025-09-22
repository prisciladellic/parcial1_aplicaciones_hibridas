import dotenv from "dotenv";
import jsonwebtoken from "jsonwebtoken";

dotenv.config();
const SECRET_KEY = process.env.SECRET_KEY;

const validateToken = (req, res, next) => {
    console.log('[Validator]: Te estoy vigilando 👀');

    // leer el token
    const token = req.headers.authorization;
    if(!token){
        res.status(401).json({ msg: 'No se pasó el jsonwebtoken'});
        return;
    }

    const jwt = token.split(' ')[1];
    console.log(jwt);

    jsonwebtoken.verify(jwt, SECRET_KEY, (error, decoded) => {
        if(error){
            res.status(403).json({ msg: 'jsonwebtoken inválido 🔴'});
            return;
        }

        req.body.cityID = decoded.id;
        console.log({decoded});

        next();
    })
}

export {validateToken};