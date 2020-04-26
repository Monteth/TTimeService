import jwt from "jsonwebtoken";
import config from "config";
import AccessLevels from "../Model/Users/AccessLevels";

export default function (req, res, next) {
    const token = (req.headers["authorization"] || '').slice(7);
    if (token.length === 0) {
        req.user = {accessLevels: [AccessLevels.GUEST]}
        next()
    } else {
        jwt.verify(token, config.get("myprivatekey"), (err, decoded) => {
            if (err) {
                res.status(400).json({errors: [{message: "Invalid token."}]});
            } else {
                req.user = decoded
                next()
            }
        })
    }
};