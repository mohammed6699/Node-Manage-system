// user roles(user and admin)
import { ERROR } from "../utlits/httpStatus.js";
export default(...role) => {
    return (req, res, next) => {
        if(!req.decodeToken.role){
            res.status(402).json({status: ERROR, data: {message: "unAuthoriaed User"}})
        }
        next()
    }
}