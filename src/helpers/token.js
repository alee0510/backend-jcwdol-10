import jwt from "jsonwebtoken"

// @create token
export const createToken = (payload) => {
    return jwt.sign(payload, process.env.JWT_SECRET_KEY, { expiresIn : "1d" })
}

// @verify token
export const verifyToken = (token) => {
    return jwt.verify(token, process.env.JWT_SECRET_KEY)
}