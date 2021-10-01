import express from 'express';
import games from './games';
import rankings from './rankings';

const router = express.Router();

router.use('/games', games);
router.use('/rankings', rankings);

export default router;
