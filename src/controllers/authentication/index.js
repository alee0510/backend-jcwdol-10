import { ValidationError } from "yup"
import * as config from "../../config/index.js"
import * as helpers from "../../helpers/index.js"
import * as error from "../../middlewares/error.handler.js"
import { User, Profile } from "../../models/user.js"
import db from "../../models/index.js"
import * as validation from "./validation.js"

// @register process
export const register = async (req, res, next) => {
    try {
        // @create transaction
        const transaction = await db.sequelize.transaction();
        
        // @validation
        const { username, password, email, phone } = req.body;
        await validation.RegisterValidationSchema.validate(req.body);

        // @check if user already exists
        const userExists = await User?.findOne({ where: { username, email } });
        if (userExists) throw ({ status : 400, message : error.USER_ALREADY_EXISTS });

        // @create user -> encypt password
        const hashedPassword = helpers.hashPassword(password);
        const user = await User?.create({
            username,
            password : hashedPassword,
            email,
            phone
        });

        //@create profile 
        await Profile?.create({ userId : user?.dataValues?.id });

        // @delete password from response
        delete user?.dataValues?.password;

        // @generate access token
        const accessToken = helpers.createToken({ id: user?.dataValues?.id, role : user?.dataValues?.role });

        // @return response
        res.header("Authorization", `Bearer ${accessToken}`)
            .status(200)
            .json({
            message: "User created successfully",
            user
        });

        //@send verification email
        const mailOptions = {
            from: config.GMAIL,
            to: email,
            subject: "Verification",
            html: `<h1>Click <a href="http://localhost:5000/api/auth/verify/${accessToken}">here</a> to verify your account</h1>`
        }
        helpers.transporter.sendMail(mailOptions, (error, info) => {
            if (error) throw error;
            console.log("Email sent: " + info.response);
        })

        // @commit transaction
        await transaction.commit();
    } catch (error) {
        // @rollback transaction
        await transaction.rollback();

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
        await validation.LoginValidationSchema.validate(req.body);

        // @check if username is email
        const isAnEmail = await validation.IsEmail(username);
        const query = isAnEmail ? { email : username } : { username };

        // @check if user exists include profile
        const userExists = await User?.findOne({ where: query, include : Profile });
        if (!userExists) throw ({ status : 400, message : error.USER_DOES_NOT_EXISTS })

        // @check if user status is active (1), deleted (2), unverified (0)
        if (userExists?.dataValues?.status === 2) throw ({ status : 400, message : error.USER_DOES_NOT_EXISTS });

        // @check if password is correct
        const isPasswordCorrect = helpers.comparePassword(password, userExists?.dataValues?.password);
        if (!isPasswordCorrect) throw ({ status : 400, message : error.INVALID_CREDENTIALS });

        // @generate access token
        const accessToken = helpers.createToken({ id: userExists?.dataValues?.id, role : userExists?.dataValues?.role });

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
        const decodedToken = helpers.verifyToken(token);

        // @update user status
        await User?.update({ status : 1 }, { where : { id : decodedToken?.id } });

        // @return response
        res.status(200).json({ message : "Account verified successfully" })
    } catch (error) {
        next(error)
    }
}

// @delete account : soft delete
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