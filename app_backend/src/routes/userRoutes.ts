import express from 'express';
import * as userController from '../controllers/userController.js'
//import upload from '../middleware/multer.middleware.js';
import multer from 'multer';
import logger from '../config/logger.js'
import Client from 'ssh2-sftp-client';

const router = express.Router();

const storage = multer.memoryStorage(); // Store file in memory
const upload = multer({ storage: storage });

router.post('/register', userController.registerUser)
router.post('/login', userController.loginUser)
router.post('/email', userController.pwdEmail)
router.post('/updatePassword', userController.pwdUpdate)

router.post('/update-profile', upload.single('image'), userController.profileUpdate)

export default router