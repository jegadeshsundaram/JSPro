import express from 'express';
import * as userController from '../controllers/userController.js'
import multer from 'multer';

const router = express.Router();

const storage = multer.memoryStorage(); // Store file in memory
const upload = multer({ storage: storage });

router.post('/register', userController.registerUser)
router.post('/login', userController.loginUser)
router.post('/email', userController.pwdEmail)
router.post('/resetPassword', userController.resetPassword)

router.post('/update-profile', upload.single('image'), userController.profileUpdate)
router.post('/updatePassword', userController.updatePassword)

router.get('/all', userController.getAll);
router.post('/detail', userController.getDetail);

export default router