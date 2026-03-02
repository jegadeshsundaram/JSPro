import nodemailer from 'nodemailer';
import ejs from 'ejs';
import dotenv from 'dotenv';
import logger from '../config/logger.js';
import { fileURLToPath } from 'node:url';
import { dirname, join, resolve } from 'node:path';
dotenv.config();
const sendMail = async (options) => {
    // 1. Create a transporter (Example using Gmail)
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.SMTP_MAIL, // Your email
            pass: process.env.SMTP_PASSWORD, // Your App Password
        },
    });
    // 2. Resolve the template path
    // Get the absolute path of the current file
    const __filename = fileURLToPath(import.meta.url);
    // Get the directory name of the current file (equivalent to __dirname)
    const __dirname = dirname(__filename);
    // Get the parent directory by resolving one level up
    const parentDir = resolve(__dirname, '..');
    const templatePath = join(parentDir, 'mails', options.template);
    logger.info(`Template File Path :: ${templatePath}`);
    // 3. Render EJS template to HTML string
    const html = await ejs.renderFile(templatePath, options.data);
    // 4. Define mail options
    const mailOptions = {
        from: process.env.SMTP_MAIL,
        to: options.email,
        subject: options.subject,
        html,
    };
    // 5. Send the email
    await transporter.sendMail(mailOptions);
};
export default sendMail;
//# sourceMappingURL=mailer.js.map