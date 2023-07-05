import { ValidationError } from "yup"
import * as config from "../../config/index.js"
import transporter from "../../helpers/transporter.js"
import User from "../../models/user.js"
import { hashPassword, comparePassword } from "../../helpers/encryption.js"
import { createToken, verifyToken } from "../../helpers/token.js"
import { USER_ALREADY_EXISTS, USER_DOES_NOT_EXISTS, INVALID_CREDENTIALS } from "../../middleware/error.handler.js"
import { LoginValidationSchema, RegisterValidationSchema, IsEmail } from "./validation.js"

// @register process
export const register = async (req, res, next) => {
    try {
        // @validation
        const { username, password, email, phone } = req.body;
        await RegisterValidationSchema.validate(req.body);

        // @check if user already exists
        const userExists = await User?.findOne({ where: { username, email } });
        if (userExists) throw ({ status : 400, message : USER_ALREADY_EXISTS });

        // @create user -> encypt password
        const hashedPassword = hashPassword(password);
        const user = await User?.create({
            username,
            password : hashedPassword,
            email,
            phone
        });

        // @delete password from response
        delete user?.dataValues?.password;

        // @generate access token
        const accessToken = createToken({ id: user?.dataValues?.id, role : user?.dataValues?.role });

        // @return response
        res.header("Authorization", `Bearer ${accessToken}`)
            .status(200)
            .json({
            message: "User created successfully",
            user
        });

        //@send verification email
        // const message = `<h1>Click <a href="http://localhost:5000/api/auth/verify/${accessToken}">here</a> to verify your account</h1>`
        const mailOptions = {
            from: config.GMAIL,
            to: email,
            subject: "Verification",
            html: `<h1>Click <a href="http://localhost:5000/api/auth/verify/${accessToken}">here</a> to verify your account</h1>`
        }
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) throw error;
            console.log("Email sent: " + info.response);
        })
    } catch (error) {
        // @check if error from validation
        if (error instanceof ValidationError) {
            return next({ status : 400, message : error?.errors?.[0] })
        }
        next(error)
    }
}

// @login process
export const login = async (req, res, next) => {
    try {
        // @validation, we assume that username will hold either username or email
        const { username, password } = req.body;
        await LoginValidationSchema.validate(req.body);

        // @check if username is email
        const isAnEmail = await IsEmail(username);
        const query = isAnEmail ? { email : username } : { username };

        // @check if user exists
        const userExists = await User?.findOne({ where: query });
        if (!userExists) throw ({ status : 400, message : USER_DOES_NOT_EXISTS })

        // @check if user status is active (1), deleted (2), unverified (0)
        if (userExists?.dataValues?.status === 2) throw ({ status : 400, message : USER_DOES_NOT_EXISTS });

        // @check if password is correct
        const isPasswordCorrect = comparePassword(password, userExists?.dataValues?.password);
        if (!isPasswordCorrect) throw ({ status : 400, message : INVALID_CREDENTIALS });

        // @generate access token
        const accessToken = createToken({ id: userExists?.dataValues?.id, role : userExists?.dataValues?.role });

        // @delete password from response
        delete userExists?.dataValues?.password;

        // @return response
        res.header("Authorization", `Bearer ${accessToken}`)
            .status(200)
            .json({ user : userExists })
    } catch (error) {
        // @check if error from validation
        if (error instanceof ValidationError) {
            return next({ status : 400, message : error?.errors?.[0] })
        }
        next(error)
    }
}

// @verify account
export const verify = async (req, res, next) => {
    try {
        // @get token from params
        const { token } = req.params;

        // @verify token
        const decodedToken = verifyToken(token);

        // @update user status
        await User?.update({ status : 1 }, { where : { id : decodedToken?.id } });

        // @return response
        res.status(200).json({ message : "Account verified successfully" })
    } catch (error) {
        next(error)
    }
}

// @delete account
export const deleteAccount = async (req, res, next) => {
    try {
        // @get user id from token
        const { id } = req.user;

        // @delete user
        await User?.update({ status : 2 }, { where : { id } });

        // @return response
        res.status(200).json({ message : "Account deleted successfully" })
    } catch (error) {
        next(error)
    }
}

// TODO : activate account