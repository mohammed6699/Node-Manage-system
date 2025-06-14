import dotenv from "dotenv";
dotenv.config();
import JWT from 'jsonwebtoken'
import { ERROR } from "../utlits/httpStatus.js";

const verifyToken = (req, res, next) => {
    const token = req.headers["Authorization"] || req.headers["authorization"]
    if(!token){
        res.status(401).json({status: ERROR, data: {message: "Token is required"}})
    }
    const reqToken = token.split('"')[1];
    try {
        const decodeToken = JWT.verify(reqToken, process.env.JWT_TOKEN)
        req.decodeToken = decodeToken
        next();
    } catch (error) {
        return res.status(401).json({status: ERROR, data:{message: error}})
    }
}
export default verifyToken;