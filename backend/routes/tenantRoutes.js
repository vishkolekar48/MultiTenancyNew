import express from 'express';
import { createTenant } from '../controller/TenantController.js';

const router = express.Router();

router.post('/create', createTenant);

export default router;