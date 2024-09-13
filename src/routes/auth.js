import { Router } from 'express';
import AuthController from '../controllers/AuthController.js';

const router = Router();

router.post('/', AuthController.auth);

export default router;
