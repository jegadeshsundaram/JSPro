import express from 'express';
import * as companyController from '../controllers/companyController.js'
import multer from 'multer';

const router = express.Router();

router.get('/profile', companyController.getProfile);

export default router