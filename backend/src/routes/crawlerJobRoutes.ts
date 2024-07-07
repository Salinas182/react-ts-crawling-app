import express from 'express';
import { createCrawlerJob, getCrawlerJobs } from '../controllers/crawlerJobController';
import { verifyToken } from '../middlewares/verifyToken';

const router = express.Router();

router.post('/', verifyToken, createCrawlerJob);
router.get('/', verifyToken, getCrawlerJobs);

export default router;
