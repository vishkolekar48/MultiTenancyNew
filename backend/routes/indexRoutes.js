import express from 'express';
import clientRoutes from './clientRoutes.js';
import tenantRoutes from './tenantRoutes.js';
import UserRoutes from './userRoutes.js';
import restaurantRoutes from './restaurantRoutes.js';
import rolesRoutes from './rolesRoutes.js';
const router = express.Router();

router.use('/client', clientRoutes);
router.use('/tenant', tenantRoutes);
router.use('/user', UserRoutes);
router.use('/restaurant', restaurantRoutes);
router.use('/roles', rolesRoutes);

export default router;