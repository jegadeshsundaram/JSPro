import express from 'express';
import * as clientController from '../controllers/clientController.js'
import multer from 'multer';

const router = express.Router();

router.post('/checkAvailability', clientController.getClientByUENORName);
router.get('/all', clientController.getAll);
router.post('/detail', clientController.getDetail);
router.post('/update', clientController.updateClient);
router.post('/delete', clientController.deleteClient);

export default router