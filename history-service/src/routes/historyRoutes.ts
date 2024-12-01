import { Router } from 'express';
import * as historyController from '../controllers/historyController';
import { validateRequest } from '../middleware/validateRequest';
import { createHistorySchema, getHistoryQuerySchema } from '../validations/historyValidation';

const router = Router();

router.get('/', validateRequest(getHistoryQuerySchema), historyController.getHistory);
router.post('/', validateRequest(createHistorySchema), historyController.createHistoryEntry);

export default router;
