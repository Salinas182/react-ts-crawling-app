import express from 'express';
import { createCrawlerJob, getCrawlerJobs, getJobStatus, startCrawling } from '../controllers/crawlerJobController';
import { verifyToken } from '../middlewares/verifyToken';

const router = express.Router();

router.post('/', verifyToken, createCrawlerJob);
router.get('/', verifyToken, getCrawlerJobs);
router.get('/:jobId', verifyToken, getJobStatus);
router.post('/:jobId/start', verifyToken, startCrawling);

export default router;
