import { Router } from 'express';
import { getStats } from '../controllers/statsController';
import { authenticate } from '../middlewares/authMiddleware';

const router = Router();

router.use(authenticate);

router.get('/', getStats);

export default router;
