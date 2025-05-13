import express from 'express';
import { UserRegistration ,UserLogin} from '../controller/UserController.js';

const router = express.Router();

router.post('/registration', UserRegistration);
router.post('/login', UserLogin);

export default router;