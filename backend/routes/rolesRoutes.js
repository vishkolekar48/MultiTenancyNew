import express from 'express';
import { createRole } from '../controller/RolesController.js';

const router = express.Router();

router.post('/create', createRole);


export default router;