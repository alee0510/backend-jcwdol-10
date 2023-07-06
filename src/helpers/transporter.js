import nodemailer from 'nodemailer';
import * as config from "../config/index.js";

// @create transporter using gmail in nodemailer
export const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: config.GMAIL,
        pass: config.GMAIL_APP_KEY
    },
    tls: {
        rejectUnauthorized: false
    }
})