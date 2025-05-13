import express from 'express';
import { createClient } from '../controller/ClientController.js';

const router = express.Router();

router.post('/create', createClient);


export default router;