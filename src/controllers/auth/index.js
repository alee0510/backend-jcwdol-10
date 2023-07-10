import { ValidationError } from "yup"
import handlebars from "handlebars"
import fs from "fs"
import path from "path"
import moment from "moment"

import * as config from "../../config/index.js"
import * as helpers from "../../helpers/index.js"
import * as error from "../../middlewares/error.handler.js"
import { User, Profile } from "../../models/user.profile.js"
import db from "../../database/index.js"
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

        // @generate otp token
        const otpToken = helpers.generateOtp();

        // @archive user data
        const user = await User?.create({
            username,
            password : hashedPassword,
            email,
            phone,
            otp : otpToken,
            expiredOtp : moment().add(1, "days").format("YYYY-MM-DD HH:mm:ss")
        });

        //@create profile 
        await Profile?.create({ userId : user?.dataValues?.id });

        // @delete unused data from response
        delete user?.dataValues?.password;
        delete user?.dataValues?.otp;
        delete user?.dataValues?.expiredOtp;

        // @generate access token
        const accessToken = helpers.createToken({ uuid: user?.dataValues?.uuid, role : user?.dataValues?.role });

        // @send response
        res.header("Authorization", `Bearer ${accessToken}`)
            .status(200)
            .json({
                message: "User created successfully",
                user
            });

        // @generate email message
        const template = fs.readFileSync(path.join(process.cwd(), "templates", "index.html"), "utf8");
        const message  = handlebars.compile(template)({ otpToken, link : config.REDIRECT_URL + `/auth/verify/reg-${user?.dataValues?.uuid}` })

        //@send verification email
        const mailOptions = {
            from: config.GMAIL,
            to: email,
            subject: "Verification",
            html: message
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

        // @check if user status is un-verified (1), verified (2), deleted (3)
        if (userExists?.dataValues?.status === 3) throw ({ status : 400, message : error.USER_DOES_NOT_EXISTS });

        // @check if password is correct
        const isPasswordCorrect = helpers.comparePassword(password, userExists?.dataValues?.password);
        if (!isPasswordCorrect) throw ({ status : 400, message : error.INVALID_CREDENTIALS });

        // @generate access token
        const accessToken = helpers.createToken({ uuid: userExists?.dataValues?.uuid, role : userExists?.dataValues?.role });

        // @delete password from response
        delete userExists?.dataValues?.password;
        delete userExists?.dataValues?.otp;
        delete userExists?.dataValues?.expiredOtp;

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

// @keeplogin
export const keepLogin = async (req, res, next) => {
    try {
        // @get user id from token
        const { uuid } = req.user;

        // @get user data
        const user = await User?.findOne({ where : { uuid }, include : Profile });

        // @delete password from response
        delete user?.dataValues?.password;
        delete user?.dataValues?.otp;
        delete user?.dataValues?.expiredOtp;

        // @return response
        res.status(200).json({ user })
    } catch (error) {
        next(error)
    }
}

// @verify account
export const verify = async (req, res, next) => {
    try {
        // @get token from params
        const { uuid, token } = req.body;    
        
        // @check context
        const context = uuid.split("-")[0];
        const userId = uuid.split("-")?.slice(1)?.join("-");

        // @check if user exists
        const user = await User?.findOne({ where : { uuid : userId } });
        if (!user) throw ({ status : 400, message : error.USER_DOES_NOT_EXISTS });

        // @verify token
        if (token !== user?.dataValues?.otp) throw ({ status : 400, message : error.INVALID_CREDENTIALS });

        // @check if token is expired
        const isExpired = moment().isAfter(user?.dataValues?.expiredOtp);
        if (isExpired) throw ({ status : 400, message : error.INVALID_CREDENTIALS });

        // @check context to do query action
        if (context === "reg") {
            // @update user status
            await User?.update({ status : 2, otp : null, expiredOtp : null }, { where : { uuid : userId } });
        }

        // @return response
        res.status(200).json({ message : "Account verified successfully",  data : uuid })
    } catch (error) {
        next(error)
    }
}

// @request otp token
export const requestOtp = async (req, res, next) => {
    try {
        // @get user email, context from body (reg or reset)
        const { email, context } = req.body;

        // @check if user exists
        const user = await User?.findOne({ where : { email } });
        if (!user) throw ({ status : 400, message : error.USER_DOES_NOT_EXISTS });

        // @generate otp token
        const otpToken = helpers.generateOtp();

        // @update user otp token
        await User?.update({ otp : otpToken, expiredOtp : moment().add(1, "days").format("YYYY-MM-DD HH:mm:ss") }, { where : { email } });

        // @generate email message
        const template = fs.readFileSync(path.join(process.cwd(), "templates", "index.html"), "utf8");
        const message  = handlebars.compile(template)({ otpToken, link : config.REDIRECT_URL + `/auth/verify/${context}-${user?.dataValues?.uuid}` })

        //@send verification email
        const mailOptions = {
            from: config.GMAIL,
            to: email,
            subject: "Verification",
            html: message
        }
        helpers.transporter.sendMail(mailOptions, (error, info) => {
            if (error) throw error;
            console.log("Email sent: " + info.response);
        })

        // @return response
        res.status(200).json({ message : "Otp token requested successfully" })
    } catch (error) {
        next(error)
    }
}

// @delete account : soft delete
export const deleteAccount = async (req, res, next) => {
    try {
        // @get user id from token
        const { uuid } = req.user;

        // @delete user
        await User?.update({ status : 2 }, { where : { uuid } });

        // @return response
        res.status(200).json({ message : "Account deleted successfully" })
    } catch (error) {
        next(error)
    }
}