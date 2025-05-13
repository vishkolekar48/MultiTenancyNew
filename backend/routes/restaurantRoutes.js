import express from 'express';
import { createRestaurant } from '../controller/RestaurantController.js';

const router = express.Router();

router.post('/create', createRestaurant);


export default router;