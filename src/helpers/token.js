import jwt from "jsonwebtoken"
import * as config from "../config/index.js"

// @create token
export const createToken = (payload, expiresIn = "1d") => {
    return jwt.sign(payload, config.JWT_SECRET_KEY, { expiresIn : expiresIn })
}

// @verify token
export const verifyToken = (token) => {
    return jwt.verify(token, config.JWT_SECRET_KEY)
}