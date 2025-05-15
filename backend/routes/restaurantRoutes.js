import express from 'express';
import { createRestaurant,getAdmins } from '../controller/RestaurantController.js';

const router = express.Router();

router.post('/create', createRestaurant);
router.get('/getadminlist',getAdmins)

export default router;