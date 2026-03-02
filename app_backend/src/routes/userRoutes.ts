import express from 'express';
import * as userController from '../controllers/userController.js'

const router = express.Router();

router.post('/register', userController.registerUser)
router.post('/login', userController.loginUser)
router.post('/email', userController.pwdEmail)
router.post('/updatePassword', userController.pwdUpdate)


export default router