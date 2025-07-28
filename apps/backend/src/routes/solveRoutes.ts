import { Router } from 'express';
import { addSolve, getSolves, deleteSolve } from '../controllers/solveController';
import { authenticate } from '../middlewares/authMiddleware';

const router = Router();

router.use(authenticate);

router.get('/', getSolves);
router.post('/', addSolve);
router.delete('/:id', deleteSolve);

export default router;
