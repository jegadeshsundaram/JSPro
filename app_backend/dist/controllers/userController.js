import asyncHandler from 'express-async-handler';
import logger from '../config/logger.js';
import { db } from '../config/db.js';
import bcrypt from 'bcryptjs';
import generateToken from '../utils/generateToken.js';
import sendMail from '../utils/mailer.js';
const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    // check if email exists in db
    const user = await getUser(email);
    if (!user) {
        res.status(404);
        throw new Error('User not exists');
    }
    logger.info(">>>> Full Name for Generating Token", user.full_name);
    // return user obj if their password matches
    if (user && (await bcrypt.compare(password, user.password))) {
        logger.info(`${email} signed in at ${new Date().toISOString()}`);
        res.status(201).json({
            _id: user.user_id,
            fullName: user.full_name,
            email: user.email,
            userToken: generateToken(user.user_id.toString()),
        });
    }
    else {
        res.status(401);
        throw new Error('Invalid email or password');
    }
});
const registerUser = asyncHandler(async (req, res) => {
    const { fullName, email, password } = req.body;
    // check if email exists in db
    const userExists = await getUser(email);
    if (userExists) {
        res.status(404);
        throw new Error('User already exists');
    }
    // create new user document in db
    const hashedPassword = await bcrypt.hash(password, 10);
    const [result] = await db.query('INSERT INTO users (full_name, email, password) VALUES (?, ?, ?)', [fullName, email, hashedPassword]);
    logger.info(`${email} registered at ${new Date().toISOString()}`);
    res.status(201).json({
        _id: result.insertId,
        fullName: fullName,
        email: email,
    });
});
async function getUser(email) {
    try {
        const [rows] = await db.execute('SELECT * FROM users WHERE email = ?', [email]);
        // 'rows' is an array containing the results of the query.
        if (rows.length > 0) {
            logger.info(`Found ${rows.length} users.`);
            logger.info(`Full Name ${rows[0].full_name} users.`);
            return rows[0]; // Return the first matching user object
        }
        else {
            return null; // No user found with the given ID
        }
    }
    catch (error) {
        logger.info('Error fetching user:', error);
        throw error; // Re-throw the error for the calling function to handle
    }
}
const pwdEmail = asyncHandler(async (req, res) => {
    const { email } = req.body;
    const user = await getUser(email);
    if (!user) {
        res.json({ status: "email_not_exists", message: 'Email not found' });
    }
    const resetPasswordCode = await getResetPassowordCode();
    await updateResetPasswordCode(email, resetPasswordCode);
    await sendMail({
        email: email,
        subject: 'Reset Password',
        template: 'password.ejs',
        data: { full_name: user.full_name, reset_password_code: resetPasswordCode }
    });
    logger.info(`\nReset Password code is sent to ${email}`);
    res.json({ status: 'ok', message: 'Email Sent' });
});
async function getResetPassowordCode() {
    // Generates a number between 1000 (inclusive) and 10000 (exclusive)
    return Math.floor(Math.random() * (9999 - 1000 + 1)) + 1000;
}
async function updateResetPasswordCode(email, code) {
    try {
        // Use the pool to execute a query. Use '?' as a placeholder for the WHERE value.
        // The values are passed in an array as the second argument.
        const [results] = await db.query("UPDATE users SET reset_password_code = ? WHERE email = ?", [code, email]);
        // Cast the result to ResultSetHeader
        const typedResult = results;
        logger.info(`Updated ${typedResult.affectedRows} record(s)`);
        return results;
    }
    catch (error) {
        logger.info('Error updating user:', error);
        throw error; // Re-throw the error for the calling function to handle
    }
}
const pwdUpdate = asyncHandler(async (req, res) => {
    const { code, password } = req.body;
    const [rows] = await db.execute('SELECT * FROM users WHERE reset_password_code = ?', [code]);
    if (rows.length > 0) {
        const hashedPassword = await bcrypt.hash(password, 10);
        const [results] = await db.query("UPDATE users SET password = ? WHERE reset_password_code = ?", [hashedPassword, code]);
        // Cast the result to ResultSetHeader
        const typedResult = results;
        logger.info(`Updated ${typedResult.affectedRows} record(s)`);
        if (typedResult.affectedRows > 0) {
            res.json({ status: 'ok', message: 'Password Updated' });
        }
    }
    else {
        res.json({ status: 'code_not_exist', message: 'Code Not Exists' });
    }
});
export { registerUser, loginUser, pwdEmail, pwdUpdate };
//# sourceMappingURL=userController.js.map