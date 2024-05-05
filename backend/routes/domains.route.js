import express from 'express';
import {
  createHostedZoneHandler,
  deleteHostedZoneHandler,
  listHostedZonesHandler,
} from '../controllers/domains.controller.js';
import { verifyUser } from '../middleware/auth.middleware.js';

const router = express.Router();

router.get('/all',verifyUser, listHostedZonesHandler);
router.post('/create',verifyUser, createHostedZoneHandler);
router.post('/delete',verifyUser, deleteHostedZoneHandler);

export default router;
