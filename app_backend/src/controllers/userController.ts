import { Request, Response } from 'express'
import asyncHandler from 'express-async-handler'
import logger from '../config/logger.js'
import { RegisterBody, LoginBody } from '../types/index.js'
import { db } from '../config/db.js'
import { ResultSetHeader } from 'mysql2/promise';
import { RowDataPacket } from 'mysql2/promise'
import bcrypt from 'bcryptjs'
import generateToken from '../utils/generateToken.js'
import sendMail from '../utils/mailer.js'
import path from 'path'
import Client from 'ssh2-sftp-client';

const loginUser = asyncHandler(async (req: Request<{}, {}, LoginBody>, res: Response): Promise<void> => {

   logger.info(`>>> Request to login api...`);

   const { email, password } = req.body

   logger.info(`Request Body ${email}, ${password}`);

   // check if email exists in db
   const user = await getUser(email);

   if (!user) {
      res.status(404)
      logger.info(`User not exists`);
      throw new Error('User not exists')
   }

   // return user obj if their password matches
   if (user && (await bcrypt.compare(password, user.password))) {

      logger.info(`${email} signed in at ${new Date().toISOString()}`)

      const [clientRecord] = await db.execute<RowDataPacket[]>('SELECT * FROM authorized_clients WHERE uen = ?', [user.client_uen]);

      res.status(201).json({
         _id: user.user_id,
         clientName: clientRecord[0].name,
         clientUEN: clientRecord[0].uen,
         email: user.email,
         phone: user.phone,
         username: user.username,
         profilePic: user.profile_pic,
         userToken: generateToken(user.email.toString()),
      })

   } else {
      res.status(401)
      throw new Error('Invalid email or password')
   }
})

const registerUser = asyncHandler(async (req: Request<{}, {}, RegisterBody>, res: Response): Promise<void> => {

   const { client, product, username, email, password } = req.body;

   // check if email exists in db
   const userExists = await getUser(email);

   if (userExists) {
      res.status(404)
      throw new Error('User already exists')
   }

   // create new user document in db
   const hashedPassword = await bcrypt.hash(password, 10);
   const [result] = await db.query('INSERT INTO users (username, email, password, client_uen, product) VALUES (?, ?, ?, ?, ?)', [username, email, hashedPassword, client, product]);
   logger.info(`${email} registered at ${new Date().toISOString()}`);

   // send status in api return call
   res.status(201).json({
      _id: (result as any).insertId,
      username: username,
      email: email,
   })

})

async function getUser(email: string) {
   try {

      const [rows] = await db.execute<RowDataPacket[]>('SELECT * FROM users WHERE email = ?', [email]);

      // 'rows' is an array containing the results of the query.
      if (rows.length > 0) {
         logger.info(`Found ${rows.length} users.`);
         return rows[0]; // Return the first matching user object
      } else {
         return null; // No user found with the given ID
      }

   } catch (error) {
      logger.info('Error fetching user:', error);
      throw error; // Re-throw the error for the calling function to handle
   }
}

const pwdEmail = asyncHandler(async (req: Request, res: Response) => {

   const { email } = req.body;

   const user = await getUser(email);

   if (!user) {
      res.json({ status: "email_not_exists", message: 'Email not found' });
   }

   const [client] = await db.execute<RowDataPacket[]>('SELECT * FROM authorized_clients WHERE uen = ?', [user!.client_uen]);

   const resetPasswordCode = await getResetPassowordCode();
   await updateResetPasswordCode(email, resetPasswordCode);

   await sendMail({
      email: email,
      subject: 'Reset Password',
      template: 'password.ejs',
      data: { client_name: client[0].name, client_uen: client[0].uen, reset_password_code: resetPasswordCode }
   })

   logger.info(`\nReset Password code is sent to ${email}`);

   res.json({ status: 'ok', message: 'Email Sent' });
});

async function getResetPassowordCode() {
   // Generates a number between 1000 (inclusive) and 10000 (exclusive)
   return Math.floor(Math.random() * (9999 - 1000 + 1)) + 1000;
}

async function updateResetPasswordCode(email: string, code: number) {
   try {
      // Use the pool to execute a query. Use '?' as a placeholder for the WHERE value.
      // The values are passed in an array as the second argument.
      const [results] = await db.query(
         "UPDATE users SET reset_password_code = ? WHERE email = ?",
         [code, email]
      );

      // Cast the result to ResultSetHeader
      const typedResult = results as ResultSetHeader;

      logger.info(`Updated ${typedResult.affectedRows} record(s)`);
      return results;

   } catch (error) {
      logger.info('Error updating user:', error);
      throw error; // Re-throw the error for the calling function to handle
   }
}

const resetPassword = asyncHandler(async (req: Request, res: Response) => {

   const { code, password } = req.body;

   const [rows] = await db.execute<RowDataPacket[]>('SELECT * FROM users WHERE reset_password_code = ?', [code]);
   if (rows.length > 0) {

      const hashedPassword = await bcrypt.hash(password, 10);

      const [results] = await db.query(
         "UPDATE users SET password = ? WHERE reset_password_code = ?",
         [hashedPassword, code]
      );

      // Cast the result to ResultSetHeader
      const typedResult = results as ResultSetHeader;

      logger.info(`Updated ${typedResult.affectedRows} record(s)`);

      if (typedResult.affectedRows > 0) {
         res.json({ status: 'ok', message: 'Password Updated' });
      }

   } else {
      res.json({ status: 'code_not_exist', message: 'Code Not Exists' });
   }
});

const profileUpdate = asyncHandler(async (req: Request, res: Response) => {

   const sftp = new Client();
   let profile_pic = null;

   logger.info(`Profile Update >>>> Start`);

   if (!req.file) {
      logger.info(`No image to be uploaded and ONLY user data update!`);
   } else {

      try {

         logger.info("There is Image to be uploaded with user data update!");

         // Target path on GoDaddy server
         const remoteFilePath = `/home/bywm9tx37k52/public_html/uploads/${req.file.originalname}`;

         logger.info(`remoteFilePath >>>> ${remoteFilePath}`);

         await sftp.connect({
            host: "198.12.237.45",
            port: 22,
            username: "bywm9tx37k52",
            password: "Thamayanthy0!*",
         });
         await sftp.put(req.file.buffer, remoteFilePath);
         await sftp.end();

         profile_pic = req.file.originalname;

         logger.info(`1 >>>> ${profile_pic}`);

      } catch (err) {
         console.error(err);
         logger.info(`Image Upload Error >>>> ${err}`);
         res.status(500).send('SFTP upload failed.');
      }
   }

   logger.info(`2 >>>> ${profile_pic}`);

   const { user_id, phone, username, email } = req.body;

   const user = await getUserById(user_id);

   if (user!.email !== email && await isEmailExists(email)) {
      res.json({ status: 'error', message: 'Email already exists!' });
   }

   if (user!.username !== username && await isUsernameExists(username)) {
      res.json({ status: 'error', message: 'Username already exists!' });
   }

   let credentialsUpdate = 0;
   if (user!.email !== email || user!.username !== username) {
      credentialsUpdate = 1;
   }

   const [results] = await db.query(
      "UPDATE users SET email = ?, username = ?, phone = ?, profile_pic = ? WHERE user_id = ?",
      [email, username, phone, profile_pic, user_id]
   );

   // Cast the result to ResultSetHeader
   const typedResult = results as ResultSetHeader;

   logger.info(`Updated ${typedResult.affectedRows} record(s)`);

   if (typedResult.affectedRows > 0) {
      res.json({ status: 'ok', message: 'Profile Updated', credentialsUpdate });
   } else {
      res.json({ status: 'error', message: 'Error or No update' });
   }

});


async function getUserById(user_id: number) {
   try {

      const [rows] = await db.execute<RowDataPacket[]>('SELECT * FROM users WHERE user_id = ?', [user_id]);

      // 'rows' is an array containing the results of the query.
      if (rows.length > 0) {
         logger.info(`Found ${rows.length} users.`);
         return rows[0]; // Return the first matching user object
      } else {
         return null; // No user found with the given ID
      }

   } catch (error) {
      logger.info('Error fetching user:', error);
      throw error; // Re-throw the error for the calling function to handle
   }
}

async function isEmailExists(email: string) {
   try {

      const [rows] = await db.execute<RowDataPacket[]>('SELECT email FROM users WHERE email = ?', [email]);

      // 'rows' is an array containing the results of the query.
      if (rows.length > 0) {
         logger.info(`Found ${rows.length} users.`);
         return true; // Return true
      } else {
         return null; // No user found with the given ID
      }

   } catch (error) {
      logger.info('Error fetching user:', error);
      throw error; // Re-throw the error for the calling function to handle
   }
}

async function isUsernameExists(username: string) {
   try {

      const [rows] = await db.execute<RowDataPacket[]>('SELECT username FROM users WHERE username = ?', [username]);

      // 'rows' is an array containing the results of the query.
      if (rows.length > 0) {
         logger.info(`Found ${rows.length} users.`);
         return true; // Return true
      } else {
         return null; // No user found with the given ID
      }

   } catch (error) {
      logger.info('Error fetching user:', error);
      throw error; // Re-throw the error for the calling function to handle
   }
}

const updatePassword = asyncHandler(async (req: Request, res: Response) => {

   const { user_id, password } = req.body;

   const hashedPassword = await bcrypt.hash(password, 10);

   const [results] = await db.query(
      "UPDATE users SET password = ? WHERE user_id = ?",
      [hashedPassword, user_id]
   );

   // Cast the result to ResultSetHeader
   const typedResult = results as ResultSetHeader;

   logger.info(`Updated ${typedResult.affectedRows} record(s)`);

   if (typedResult.affectedRows > 0) {
      res.json({ status: 'ok', message: 'Password Updated' });
   }

});

const getAll = asyncHandler(async (req: Request, res: Response) => {

   logger.info(`populating all the users`);

   const [users] = await db.execute<RowDataPacket[]>('SELECT * FROM users order by created_on desc');

   if (users.length > 0) {
      logger.info(`Found ${users.length} users.`);

      res.status(201).json({
         status: 'ok',
         users,
      })

   } else {
      res.json({ status: "users_not_exist", message: 'Users not found' });
   }

});

const getDetail = asyncHandler(async (req: Request, res: Response) => {

   const { user_id } = req.body;

   logger.info(`>>>> User ID ${user_id} >>>>`);

   const [user] = await db.execute<RowDataPacket[]>('SELECT * FROM users WHERE user_id = ?', [user_id]);

   if (user.length > 0) {
      res.status(201).json({
         status: 'ok',
         user,
      })

   } else {
      res.json({ status: "user_not_exist", message: 'User not found' });
   }

});

export { registerUser, loginUser, pwdEmail, resetPassword, profileUpdate, updatePassword, getAll, getDetail }