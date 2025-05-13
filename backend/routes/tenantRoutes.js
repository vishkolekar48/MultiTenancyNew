import express from 'express';
import { UserRegistration ,UserLogin} from '../controller/UserController.js';

const router = express.Router();

router.post('/', UserRegistration);
router.post('/user-login', UserLogin);

export default router;